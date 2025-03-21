import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Button } from "@mui/material";
import PolicySection from "./PolicySection ";
import { processField } from "./chrome-utils";
const PolicyForm = ({ storedData, onSave, onCancel }) => {
  const [fieldValues, setFieldValues] = useState({});

  useEffect(() => {
    const initialValues = {};
    storedData.forEach((policy) => {
      policy.fieldDescriptions.forEach((field) => {
        if (field.defaultValue !== undefined) {
          initialValues[field.field] = field.defaultValue;
        }
      });
    });
    setFieldValues(initialValues);
  }, [storedData]);

  const handleFieldChange = useCallback((fieldLabel, value) => {
    console.log("Received updated field values:", fieldLabel, value); // Debugging
    setFieldValues((prev) => ({
      ...prev,
      [fieldLabel]: value,
    }));
  }, []);

  const handleSave = () => {
    const result = {};

    storedData.forEach((policy) => {
      const policyResult = {};
      policy.fieldDescriptions.forEach((field) => {
        const fieldName = field.field;
        policyResult[fieldName] = processField(field, fieldValues);
      });

      result[policy.policyDescription] = policyResult;
    });

    console.log("Final fieldValues:", fieldValues); // Debugging
    console.log("Saved value:", result); // Debugging
    onSave(result);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Box sx={{ p: 2.5, backgroundColor: "#f5f5f5" }}>
      {storedData.map((policy, policyIndex) => (
        <PolicySection
          key={policyIndex}
          policy={policy}
          fieldValues={fieldValues}
          onFieldChange={handleFieldChange}
        />
      ))}

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, gap: 2 }}>
        <Button
          variant="outlined"
          onClick={handleCancel}
          sx={{
            textTransform: "none",
            color: "black",
            borderColor: "black",
            "&:hover": {
              backgroundColor: "white",
              borderColor: "black",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            textTransform: "none",
            backgroundColor: "black",
            "&:hover": {
              backgroundColor: "black",
            },
          }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

PolicyForm.propTypes = {
  storedData: PropTypes.arrayOf(
    PropTypes.shape({
      policyDescription: PropTypes.string.isRequired,
      fieldDescriptions: PropTypes.arrayOf(
        PropTypes.shape({
          field: PropTypes.string.isRequired,
          type: PropTypes.string.isRequired,
          label: PropTypes.string,
          knownValueDescriptions: PropTypes.arrayOf(
            PropTypes.shape({
              value: PropTypes.string.isRequired,
              description: PropTypes.string.isRequired,
            })
          ),
          defaultValue: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.bool,
          ]),
          fieldDependencies: PropTypes.arrayOf(
            PropTypes.shape({
              sourceField: PropTypes.string.isRequired,
              sourceFieldValue: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
                PropTypes.bool,
              ]).isRequired,
            })
          ),
          nestedFields: PropTypes.arrayOf(PropTypes.object),
        })
      ).isRequired,
    })
  ).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default PolicyForm;
