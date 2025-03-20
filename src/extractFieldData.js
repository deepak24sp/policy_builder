// Global formData variable
let formData = {};

function getType(fieldName, allFields, isEnum) {
  const field = allFields.find((f) => f.name === fieldName);
  if (!field) return "TYPE_UNKNOWN";
  // If the field has knownValueDescriptions (isEnum is true), treat it as TYPE_ENUM
  if (
    isEnum &&
    (field.type === "TYPE_INT64" ||
      field.type === "TYPE_STRING" ||
      field.type === "TYPE_INT32")
  ) {
    return "TYPE_ENUM";
  }

  return field.type;
}

function getLabel(fieldName, allFields) {
  const field = allFields.find((f) => f.name === fieldName);
  if (!field) return "TYPE_UNKNOWN";
  return field.label;
}

function checkFieldDependencies(field) {
  // If no dependencies, field is always active
  if (!field.fieldDependencies || field.fieldDependencies.length === 0) {
    return true;
  }

  // console.log("field", field);
  // console.log("formdata", formData);
  // console.log("-->", formData.updateDisabled);

  // console.log("---");
  // Check if any dependency condition is met
  return field.fieldDependencies.some((dependency) => {
    const sourceValue = formData[dependency.sourceField];
    // console.log("------++", sourceValue, dependency.sourceFieldValue);
    // console.log(String(sourceValue) === String(dependency.sourceFieldValue));
    return String(sourceValue) === String(dependency.sourceFieldValue);
  });
}

export function extractFieldData(jsonFile) {
  if (!jsonFile || !jsonFile.fieldDescriptions) return [];

  const policyDescription =
    jsonFile.policyDescription || "No description available";
  const allFields = jsonFile.definition.messageType.flatMap(
    (messageType) => messageType.field
  );
  const name = jsonFile.name;

  // Helper function to populate formData with fields that have default values
  const populateFormData = (fields, parentFieldName = "") => {
    fields.forEach((field) => {
      const fullFieldName = parentFieldName
        ? `${parentFieldName}.${field.field}`
        : field.field;

      // Add the field to formData only if it has a default value
      if (
        field.defaultValue !== undefined &&
        formData[fullFieldName] === undefined
      ) {
        formData[fullFieldName] = field.defaultValue;
      }

      // Recursively populate nested fields
      if (field.nestedFields && field.nestedFields.length > 0) {
        populateFormData(field.nestedFields, fullFieldName);
      }
    });
  };

  // First, populate the global formData with default values
  populateFormData(jsonFile.fieldDescriptions);

  // Log the formData after population
  // console.log("Global formData after population:", formData);

  // Extract main fieldDescriptions
  const extractedFields = jsonFile.fieldDescriptions.map((fieldDescription) => {
    const isEnum = !!fieldDescription.knownValueDescriptions;
    const extractedField = {
      section: fieldDescription.field,
      field: fieldDescription.field,
      description: fieldDescription.description || "No description available",
      type: getType(fieldDescription.field, allFields, isEnum),
      label: getLabel(fieldDescription.field, allFields),
      defaultValue: fieldDescription.defaultValue,
      knownValueDescriptions: isEnum
        ? fieldDescription.knownValueDescriptions
        : [],
      nestedFields: extractNestedFields(
        fieldDescription.nestedFieldDescriptions,
        allFields,
        fieldDescription.field
      ),
      fieldDependencies: fieldDescription.fieldDependencies || [],
    };
    // Check if the field should be active based on dependencies
    extractedField.isActive = checkFieldDependencies(extractedField);
    // console.log("<><><>", extractedField.isActive);
    return extractedField;
  });

  // Extract top-level nestedFieldDescriptions if present in jsonFile
  const topLevelNestedFields = jsonFile.nestedFieldDescriptions
    ? extractNestedFields(jsonFile.nestedFieldDescriptions, allFields, "")
    : [];

  return {
    name,
    policyDescription,
    fieldDescriptions: extractedFields,
    nestedFieldDescriptions: topLevelNestedFields,
  };
}

function extractNestedFields(
  nestedFieldDescriptions,
  allFields,
  parentFieldName = ""
) {
  if (!nestedFieldDescriptions) return [];
  return nestedFieldDescriptions.map((nestedField) => {
    const fullFieldName = parentFieldName
      ? `${parentFieldName}.${nestedField.field}`
      : nestedField.field;
    const isEnum = !!nestedField.knownValueDescriptions;
    const extractedNestedField = {
      section: fullFieldName,
      field: nestedField.field,
      description: nestedField.description || "No description available",
      type: getType(nestedField.field, allFields, isEnum),
      label: getLabel(nestedField.field, allFields), // Ensure label is fetched for nested fields
      defaultValue: nestedField.defaultValue,
      knownValueDescriptions: isEnum ? nestedField.knownValueDescriptions : [],
      fieldDependencies: nestedField.fieldDependencies || [],
      nestedFields: extractNestedFields(
        nestedField.nestedFieldDescriptions,
        allFields,
        fullFieldName
      ),
    };
    // Check if the nested field should be active based on dependencies
    extractedNestedField.isActive =
      checkFieldDependencies(extractedNestedField);
    return extractedNestedField;
  });
}
