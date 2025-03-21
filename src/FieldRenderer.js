import React, { useMemo } from "react";
import PropTypes from "prop-types";
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
} from "@mui/material";
import RepeatedField from "./RepeatedField";
import RepeatedNestedField from "./RepeatedNestedField";
import RepeatedStringInput from "./RepeatedStringInput";
import { evaluateDependencies } from "./chrome-utils";
const FieldRenderer = ({ field, fieldValues: values, onFieldChange }) => {
  const {
    type,
    label,
    knownValueDescriptions = [],
    defaultValue,
    field: fieldLabel,
    fieldDependencies = [],
    nestedFields = [],
  } = field;

  const isActive = useMemo(
    () => evaluateDependencies(fieldDependencies, values),
    [fieldDependencies, values]
  );

  if (!isActive) {
    return null;
  }

  if (type === "TYPE_MESSAGE" && label === "LABEL_REPEATED") {
    return (
      <RepeatedNestedField
        fieldLabel={fieldLabel}
        nestedFields={nestedFields}
        fieldValues={values}
        onFieldChange={(fieldName, value) => {
          // Propagate the updated array of nested fields to the parent
          onFieldChange(fieldLabel, value);
        }}
      />
    );
  }

  if (nestedFields && nestedFields.length > 0) {
    return (
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
          {fieldLabel}
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
  }

  switch (type) {
    case "TYPE_ENUM":
      if (label === "LABEL_REPEATED") {
        return (
          <RepeatedField
            fieldLabel={fieldLabel}
            knownValueDescriptions={knownValueDescriptions}
            fieldValues={values}
            onFieldChange={onFieldChange}
            defaultValue={defaultValue}
          />
        );
      }

      return (
        <FormControl fullWidth sx={{ mb: 2.5, mt: 2.5, position: "relative" }}>
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
            {fieldLabel}
          </Typography>
          <InputLabel id={`${fieldLabel}-label`} sx={{ display: "none" }}>
            {fieldLabel}
          </InputLabel>
          <Select
            labelId={`${fieldLabel}-label`}
            value={values[fieldLabel] ?? defaultValue}
            onChange={(e) => onFieldChange(fieldLabel, e.target.value)}
            label=""
            sx={{ height: "48px" }}
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
              sx={{ fontSize: "0.9rem", color: "rgba(0, 0, 0, 0.87)" }}
            >
              {fieldLabel}
            </FormLabel>
            <FormControlLabel
              control={
                <Switch
                  checked={
                    values[fieldLabel] === "true" || values[fieldLabel] === true
                  }
                  onChange={(e) =>
                    onFieldChange(fieldLabel, e.target.checked.toString())
                  }
                  color="success"
                />
              }
              label={
                knownValueDescriptions.length > 0
                  ? knownValueDescriptions[0].description
                  : ""
              }
              labelPlacement="start"
              sx={{ m: 0 }}
            />
          </FormControl>
        );
      }

      return (
        <FormControl component="fieldset" sx={{ mb: 2.5, display: "block" }}>
          <FormLabel
            sx={{ fontSize: "0.9rem", color: "rgba(0, 0, 0, 0.87)", mb: 1 }}
          >
            {fieldLabel}
          </FormLabel>
          <RadioGroup
            row
            value={values[fieldLabel] ?? defaultValue?.toString()}
            onChange={(e) => onFieldChange(fieldLabel, e.target.value)}
          >
            {knownValueDescriptions.map((item, index) => (
              <FormControlLabel
                key={index}
                value={item.value}
                control={<Radio />}
                label={item.description}
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
          value={values[fieldLabel] ?? defaultValue}
          onChange={(e) => onFieldChange(fieldLabel, e.target.value)}
          variant="outlined"
          sx={{ mb: 2.5, mt: 2.5, position: "relative" }}
          InputLabelProps={{ shrink: true }}
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
                {fieldLabel}
              </Typography>
            ),
          }}
        />
      );

    case "TYPE_STRING":
      if (label === "LABEL_REPEATED") {
        return (
          <RepeatedStringInput
            fieldLabel={fieldLabel}
            values={values}
            onFieldChange={onFieldChange}
          />
        );
      }

      // Normal text input for non-repeated strings
      return (
        <TextField
          label=""
          type="text"
          fullWidth
          value={values[fieldLabel] ?? defaultValue}
          onChange={(e) => onFieldChange(fieldLabel, e.target.value)}
          variant="outlined"
          sx={{ mb: 2.5, mt: 2.5, position: "relative" }}
          InputLabelProps={{ shrink: true }}
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
                {fieldLabel}
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
            value={values[fieldLabel] ?? defaultValue}
            onChange={(e) => onFieldChange(fieldLabel, e.target.value)}
            variant="outlined"
            sx={{ mb: 2.5, mt: 2.5, position: "relative" }}
            InputLabelProps={{ shrink: true }}
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
                  {fieldLabel}
                </Typography>
              ),
            }}
          />
        );
      }

      return (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
            {fieldLabel}
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
};

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

export default FieldRenderer;
