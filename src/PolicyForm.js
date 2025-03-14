import React, { useState, useCallback, useMemo, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  Box,
  Switch,
  Typography,
  Button,
} from "@mui/material";
import RepeatedField from "./RepeatedField";

const PolicyForm = ({ storedData, onSave, onCancel }) => {
  const [fieldValues, setFieldValues] = useState({});

  // Initialize fieldValues with default values when the component mounts
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

  const handleFieldChange = useCallback((fieldPath, value) => {
    setFieldValues((prevValues) => ({
      ...prevValues,
      [fieldPath]: value, // Use the full field path as the key
    }));
  }, []);

  const evaluateDependencies = useCallback(
    (fieldDependencies, currentFieldValues) => {
      if (!fieldDependencies || fieldDependencies.length === 0) return true;

      return fieldDependencies.every((dependency) => {
        const fieldValue = currentFieldValues[dependency.sourceField];
        const expectedValue = dependency.sourceFieldValue;
        return String(fieldValue) === String(expectedValue);
      });
    },
    []
  );

  // Recursive function to handle nested fields
  const processField = (field, currentFieldValues, parentFieldPath = "") => {
    const { field: fieldName, nestedFields } = field;
    const fullFieldPath = parentFieldPath
      ? `${parentFieldPath}.${fieldName}`
      : fieldName;

    if (nestedFields && nestedFields.length > 0) {
      const nestedResult = {};
      nestedFields.forEach((nestedField) => {
        const nestedFieldName = nestedField.field;
        nestedResult[nestedFieldName] = processField(
          nestedField,
          currentFieldValues,
          fullFieldPath
        );
      });
      return nestedResult;
    }

    return currentFieldValues[fullFieldPath] ?? field.defaultValue;
  };

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

    onSave(result);
  };

  const handleCancel = () => {
    // Call the onCancel prop
    onCancel();
  };

  const FieldRenderer = React.memo(
    ({ field, fieldValues: values, onFieldChange, parentFieldPath = "" }) => {
      const {
        type,
        label,
        knownValueDescriptions = [],
        defaultValue,
        field: fieldName,
        fieldDependencies = [],
        nestedFields = [],
      } = field;

      // Construct the full field path
      const fullFieldPath = parentFieldPath
        ? `${parentFieldPath}.${fieldName}`
        : fieldName;

      // Calculate isActive unconditionally
      const isActive = useMemo(
        () => evaluateDependencies(fieldDependencies, values),
        [fieldDependencies, values]
      );

      if (!isActive) {
        return null; // Hide the field if dependencies are not met
      }

      if (nestedFields && nestedFields.length > 0) {
        return (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
              {fieldName}
            </Typography>
            {nestedFields.map((nestedField, index) => (
              <Box key={index} sx={{ ml: 3, mt: 1.5 }}>
                <FieldRenderer
                  field={nestedField}
                  fieldValues={values}
                  onFieldChange={onFieldChange}
                  parentFieldPath={fullFieldPath} // Pass the full field path
                />
              </Box>
            ))}
          </Box>
        );
      }

      switch (type) {
        case "TYPE_ENUM":
          if (label === "LABEL_REPEATED") {
            return (
              <RepeatedField
                fieldName={fieldName}
                knownValueDescriptions={knownValueDescriptions}
                fieldValues={values}
                onFieldChange={onFieldChange}
                defaultValue={defaultValue}
                parentFieldPath={fullFieldPath} // Pass the full field path
              />
            );
          }

          return (
            <FormControl
              fullWidth
              sx={{
                mb: 2.5,
                mt: 2.5,
                position: "relative",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1,
                },
                "& .MuiInputLabel-root": {
                  fontSize: "0.9rem",
                  color: "rgba(0, 0, 0, 0.6)",
                  transform: "translate(14px, 14px) scale(1)",
                  backgroundColor: "white",
                  padding: "0 4px",
                },
                "& .MuiInputLabel-shrink": {
                  transform: "translate(14px, -6px) scale(0.75)",
                },
              }}
            >
              <Typography
                component="span"
                sx={{
                  position: "absolute",
                  top: "-20px",
                  left: "0px",
                  fontSize: "0.75rem",
                  color: "rgba(0, 0, 0, 0.6)",
                }}
              >
                {fieldName}
              </Typography>
              <InputLabel id={`${fieldName}-label`} sx={{ display: "none" }}>
                {fieldName}
              </InputLabel>
              <Select
                labelId={`${fieldName}-label`}
                value={values[fullFieldPath] ?? defaultValue}
                onChange={(e) => onFieldChange(fullFieldPath, e.target.value)}
                label=""
                sx={{
                  height: "48px",
                  ".MuiSelect-select": { pt: 1.5, pb: 1.5, pl: 2 },
                }}
              >
                {knownValueDescriptions.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.description}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );

        case "TYPE_BOOL":
          if (!knownValueDescriptions[0]?.description) {
            return (
              <FormControl
                component="fieldset"
                sx={{
                  mb: 2.5,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <FormLabel
                  sx={{
                    fontSize: "0.9rem",
                    color: "rgba(0, 0, 0, 0.87)",
                    "&.Mui-focused": {
                      color: "rgba(0, 0, 0, 0.87)",
                    },
                  }}
                >
                  {fieldName}
                </FormLabel>
                <FormControlLabel
                  control={
                    <Switch
                      checked={
                        values[fieldName] === "true" ||
                        values[fieldName] === true
                      }
                      onChange={(e) =>
                        onFieldChange(fieldName, e.target.checked.toString())
                      }
                      color="success"
                      sx={{
                        ".MuiSwitch-track": {
                          backgroundColor: "#ccc",
                        },
                        "&.Mui-checked": {
                          "& + .MuiSwitch-track": {
                            backgroundColor: "#4caf50 !important",
                          },
                          "& .MuiSwitch-thumb": {
                            backgroundColor: "#2e7d32",
                          },
                        },
                      }}
                    />
                  }
                  label={
                    knownValueDescriptions.length > 0
                      ? knownValueDescriptions[0].description
                      : ""
                  }
                  labelPlacement="start"
                  sx={{
                    m: 0,
                    "& .MuiFormControlLabel-label": {
                      fontSize: "0.9rem",
                    },
                  }}
                />
              </FormControl>
            );
          }

          return (
            <FormControl
              component="fieldset"
              sx={{
                mb: 2.5,
                display: "block",
              }}
            >
              <FormLabel
                sx={{
                  fontSize: "0.9rem",
                  color: "rgba(0, 0, 0, 0.87)",
                  mb: 1,
                  "&.Mui-focused": {
                    color: "rgba(0, 0, 0, 0.87)",
                  },
                }}
              >
                {fieldName}
              </FormLabel>
              <RadioGroup
                row
                value={values[fieldName] ?? defaultValue?.toString()}
                onChange={(e) => onFieldChange(fieldName, e.target.value)}
                sx={{
                  ".MuiFormControlLabel-root": {
                    marginRight: 4,
                  },
                }}
              >
                {knownValueDescriptions.map((item, index) => (
                  <FormControlLabel
                    key={index}
                    value={item.value}
                    control={
                      <Radio
                        sx={{
                          color: "rgba(0, 0, 0, 0.54)",
                          "&.Mui-checked": {
                            color: "#4caf50",
                          },
                        }}
                      />
                    }
                    label={item.description}
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontSize: "0.9rem",
                      },
                    }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          );

        case "TYPE_INT64":
        case "TYPE_INT32":
          return (
            <TextField
              label=""
              type="number"
              fullWidth
              value={values[fullFieldPath] ?? defaultValue} // Use fullFieldPath
              onChange={(e) => onFieldChange(fullFieldPath, e.target.value)} // Use fullFieldPath
              variant="outlined"
              sx={{
                mb: 2.5,
                mt: 2.5,
                position: "relative",
                "& .MuiOutlinedInput-root": {
                  height: "48px",
                  borderRadius: 1,
                },
                "& .MuiInputLabel-root": {
                  display: "none",
                },
              }}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                startAdornment: (
                  <Typography
                    component="span"
                    sx={{
                      position: "absolute",
                      top: "-20px",
                      left: "0px",
                      fontSize: "0.75rem",
                      color: "rgba(0, 0, 0, 0.6)",
                    }}
                  >
                    {fieldName}
                  </Typography>
                ),
              }}
            />
          );

        case "TYPE_STRING":
          return (
            <TextField
              label=""
              type="text"
              fullWidth
              value={values[fieldName] ?? defaultValue}
              onChange={(e) => onFieldChange(fieldName, e.target.value)}
              variant="outlined"
              sx={{
                mb: 2.5,
                mt: 2.5,
                position: "relative",
                "& .MuiOutlinedInput-root": {
                  height: "48px",
                  borderRadius: 1,
                },
                "& .MuiInputLabel-root": {
                  display: "none",
                },
              }}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                startAdornment: (
                  <Typography
                    component="span"
                    sx={{
                      position: "absolute",
                      top: "-20px",
                      left: "0px",
                      fontSize: "0.75rem",
                      color: "rgba(0, 0, 0, 0.6)",
                    }}
                  >
                    {fieldName}
                  </Typography>
                ),
              }}
            />
          );

        case "TYPE_MESSAGE":
          if (!nestedFields || nestedFields.length === 0) {
            return (
              <TextField
                label=""
                type="text"
                fullWidth
                multiline
                minRows={3}
                value={values[fieldName] ?? defaultValue}
                onChange={(e) => onFieldChange(fieldName, e.target.value)}
                variant="outlined"
                sx={{
                  mb: 2.5,
                  mt: 2.5,
                  position: "relative",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 1,
                  },
                  "& .MuiInputLabel-root": {
                    display: "none",
                  },
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: (
                    <Typography
                      component="span"
                      sx={{
                        position: "absolute",
                        top: "-20px",
                        left: "0px",
                        fontSize: "0.75rem",
                        color: "rgba(0, 0, 0, 0.6)",
                      }}
                    >
                      {fieldName}
                    </Typography>
                  ),
                }}
              />
            );
          }

          return (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
                {fieldName}
              </Typography>
              {nestedFields.map((nestedField, index) => (
                <Box key={index} sx={{ ml: 3, mt: 1.5 }}>
                  <FieldRenderer
                    field={nestedField}
                    fieldValues={values}
                    onFieldChange={onFieldChange}
                  />
                </Box>
              ))}
            </Box>
          );

        default:
          return null;
      }
    }
  );

  FieldRenderer.propTypes = {
    field: PropTypes.shape({
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
      field: PropTypes.string.isRequired,
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
    }).isRequired,
    fieldValues: PropTypes.object.isRequired,
    onFieldChange: PropTypes.func.isRequired,
  };

  return (
    <Box sx={{ p: 2.5, backgroundColor: "#f5f5f5" }}>
      {storedData.map((policy, policyIndex) => (
        <Box
          key={policyIndex}
          sx={{
            mb: 4,
            pb: 3,
            borderBottom: "1px solid #e0e0e0",
            backgroundColor: "#ffffff",
            p: 3,
            borderRadius: 1,
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
            {policy.policyDescription}
          </Typography>

          {policy.fieldDescriptions.length === 1 ? (
            <FieldRenderer
              field={policy.fieldDescriptions[0]}
              fieldValues={fieldValues}
              onFieldChange={handleFieldChange}
            />
          ) : (
            policy.fieldDescriptions.map((field, fieldIndex) => (
              <FieldRenderer
                key={fieldIndex}
                field={field}
                fieldValues={fieldValues}
                onFieldChange={handleFieldChange}
              />
            ))
          )}
        </Box>
      ))}

      {/* Save and Cancel Buttons */}
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
