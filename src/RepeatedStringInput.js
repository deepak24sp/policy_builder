import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";

const RepeatedStringInput = ({ fieldLabel, values, onFieldChange }) => {
  const [inputValue, setInputValue] = useState(""); // State for the current input
  const [items, setItems] = useState(values[fieldLabel] || []); // State for the list of items

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      // Add the new item to the list
      const newItems = [...items, inputValue.trim()];
      setItems(newItems);
      onFieldChange(fieldLabel, newItems); // Propagate changes to parent
      setInputValue(""); // Clear the input
    }
  };

  const handleRemoveItem = (index) => {
    // Remove the item at the specified index
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    onFieldChange(fieldLabel, newItems); // Propagate changes to parent
  };

  return (
    <Box sx={{ mb: 2.5, mt: 2.5 }}>
      <Typography
        component="span"
        sx={{
          fontSize: "0.75rem",
          color: "rgba(0, 0, 0, 0.6)",
          display: "block",
          mb: 1,
        }}
      >
        {fieldLabel}
      </Typography>
      <TextField
        fullWidth
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type and press Enter to add"
        variant="outlined"
        sx={{ mb: 1 }}
      />
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {items.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#f0f0f0",
              borderRadius: "4px",
              padding: "4px 8px",
            }}
          >
            <Typography variant="body2">{item}</Typography>
            <Typography
              variant="body2"
              sx={{ cursor: "pointer", ml: 1, color: "red" }}
              onClick={() => handleRemoveItem(index)}
            >
              ×
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RepeatedStringInput;
