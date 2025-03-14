import { useState, useEffect } from "react";
import sample from "./data/device_update.json";
import { extractFieldData } from "./extractFieldData";
import PolicyForm from "./PolicyForm";
import Box from "@mui/material/Box";
import { policyBodyBuilder } from "./policyBodyBuilder";

function App() {
  const [storedData, setStoredData] = useState([]);
  const [savedValues, setSavedValues] = useState(null);
  const [poilcyBody, setPoilcyBody] = useState(null);

  useEffect(() => {
    const extractedData = sample.map((policy) => extractFieldData(policy)); // Process each policy
    setStoredData(extractedData); // Store the result in state
  }, []);

  useEffect(() => {
    if (storedData && savedValues) {
      // console.log(savedValues);
      // console.log(storedData);
      const body = policyBodyBuilder(storedData, savedValues);
      setPoilcyBody(body);
    }
  }, [storedData, savedValues]); // This effect runs when storedData or savedValues changes

  const handleSave = (fieldValues) => {
    setSavedValues(fieldValues);
  };

  return (
    <div>
      <Box component="section" sx={{ p: 2, width: 700 }}>
        <PolicyForm storedData={storedData} onSave={handleSave} />
      </Box>
      {/* <pre>{JSON.stringify(storedData, null, 2)}</pre> */}
      {savedValues && <pre>{JSON.stringify(savedValues, null, 2)}</pre>}

      <pre>{JSON.stringify(poilcyBody, null, 2)}</pre>
    </div>
  );
}

export default App;
