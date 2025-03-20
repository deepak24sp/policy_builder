import { useState, useEffect } from "react";
import sample from "./data/enroll.json";
import { extractFieldData } from "./extractFieldData";
import PolicyForm from "./PolicyForm";
import Box from "@mui/material/Box";

function App() {
  const [storedData, setStoredData] = useState([]); // Store extracted data for all policies

  useEffect(() => {
    const extractedData = sample.map((policy) => extractFieldData(policy)); // Process each policy
    setStoredData(extractedData); // Store the result in state
  }, []);

  const handleSave = (fieldValues) => {
    console.log("Saved values:", fieldValues);
    // Perform save logic here
  };

  return (
    <div>
      <Box component="section" sx={{ p: 2, width: 700, heigh: 100 }}>
        <PolicyForm storedData={storedData} onSave={handleSave} />
      </Box>
      <pre>{JSON.stringify(storedData, null, 2)}</pre>
    </div>
  );
}

export default App;
