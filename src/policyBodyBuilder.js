export function policyBodyBuilder(storedData, savedValues) {
  const result = {};
  // console.log(savedValues);
  // console.log(storedData);

  if (!Array.isArray(storedData)) {
    return result;
  }

  // Iterate through each key-value pair in savedValues
  for (const [policyDescriptionName, policyValue] of Object.entries(
    savedValues
  )) {
    // console.log(policyDescriptionName);
    let policyfieldDescription = null;

    for (const policy of storedData) {
      // console.log("-------------");
      if (policy.policyDescription === policyDescriptionName) {
        policyfieldDescription = policy.fieldDescriptions;
        // console.log(policyDescriptionName);
        const single = createPolicyBody(policyValue, policyfieldDescription);
        console.log(single);
      }
      break;
    }

    // console.log(policyValue);
    // console.log(policyfieldDescription);
  }

  return result;
}

// function singlePolicyBody(policyValue, policyfieldDescription) {
//   Object.entries(policyValue).forEach(([key, value], index) => {
//     console.log(policyfieldDescription[index]);
//     console.log("Key:", key);
//     console.log("Value:", value);
//     // console.log(policyfieldDescription.field);
//   });

//   console.log(policyValue);
//   console.log(policyfieldDescription);
// }

function createPolicyBody(policyValue, policyfieldDescription) {
  const policy = {};

  function processField(
    fieldDesc,
    currentPolicyValue,
    parentObject,
    parentKey
  ) {
    const { field, nestedFields, fieldDependencies, isActive, label } =
      fieldDesc;

    // Skip if the field is not active
    if (!isActive) return;

    // Check field dependencies
    const dependenciesSatisfied = fieldDependencies.every((dep) => {
      return currentPolicyValue[dep.sourceField] === dep.sourceFieldValue;
    });

    if (!dependenciesSatisfied) return;

    // Get the value from policyValue
    const value = currentPolicyValue[field];

    // Skip if the value is empty or undefined
    if (value === undefined || value === null || value === "") return;

    // Handle nested fields
    if (nestedFields && nestedFields.length > 0) {
      const nestedValue = {};
      nestedFields.forEach((nestedFieldDesc) => {
        processField(
          nestedFieldDesc,
          value,
          nestedValue,
          nestedFieldDesc.field
        );
      });

      // Add nested value to the parent object if it's not empty
      if (Object.keys(nestedValue).length > 0) {
        if (label === "LABEL_REPEATED") {
          if (!parentObject[parentKey]) {
            parentObject[parentKey] = [];
          }
          parentObject[parentKey].push(nestedValue);
        } else {
          parentObject[parentKey] = nestedValue;
        }
      }
    } else {
      // Handle LABEL_REPEATED for top-level fields
      if (label === "LABEL_REPEATED") {
        if (!parentObject[parentKey]) {
          parentObject[parentKey] = [];
        }
        parentObject[parentKey].push(value);
      } else {
        // Add the field to the parent object
        parentObject[parentKey] = value;
      }
    }
  }

  // Process each field in policyfieldDescription
  policyfieldDescription.forEach((fieldDesc) => {
    processField(fieldDesc, policyValue, policy, fieldDesc.field);
  });

  return policy;
}
