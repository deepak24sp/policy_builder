// utils.js
export const evaluateDependencies = (fieldDependencies, currentFieldValues) => {
  if (!fieldDependencies || fieldDependencies.length === 0) return true;

  return fieldDependencies.some((dependency) => {
    const fieldValue = currentFieldValues[dependency.sourceField];
    const expectedValue = dependency.sourceFieldValue;
    return String(fieldValue) === String(expectedValue);
  });
};

export const processField = (field, currentFieldValues) => {
  // console.log(field, currentFieldValues);
  const { field: fieldName, nestedFields, label } = field;

  // Handle repeated nested fields (e.g., "timeRestriction")
  if (nestedFields && nestedFields.length > 0 && label === "LABEL_REPEATED") {
    const nestedArray = currentFieldValues[fieldName] || [];
    return nestedArray.map((nestedValue) => {
      const nestedResult = {};
      nestedFields.forEach((nestedField) => {
        const nestedFieldName = nestedField.field;
        nestedResult[nestedFieldName] = processField(nestedField, nestedValue);
      });
      return nestedResult;
    });
  }

  // Handle regular nested fields
  if (nestedFields && nestedFields.length > 0) {
    const nestedResult = {};
    nestedFields.forEach((nestedField) => {
      const nestedFieldName = nestedField.field;
      nestedResult[nestedFieldName] = processField(
        nestedField,
        currentFieldValues
      );
    });
    return nestedResult;
  }

  // Handle non-nested fields
  return currentFieldValues[fieldName] ?? field.defaultValue;
};
