import React, { useState, useEffect } from "react";


const useDebounce = function (value, delay) {
    const [debouncedValue, setDebouncedValue] = useState("");
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
  
      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);
  
    return debouncedValue;
  };

export default function DebouncedInput() {
  const [value, setValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const searchTerm2 = useDebounce(value, 300);

  // Handle input typing (real-time)
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  // Debounce the value before setting it to `searchTerm`
  useEffect(() => {
    console.log("handler");
    const handler = setTimeout(() => {
      setSearchTerm(value);
    }, 300);

    // Cleanup the timer when value changes or component unmounts
    return () => {
      console.log("cleanup");
      clearTimeout(handler);
    };
  }, [value]);

  // Simulated effect: log or trigger API
  useEffect(() => {
    if (searchTerm, searchTerm2) {
      //   console.log("🔍 Search for:", searchTerm);
    }
  }, [searchTerm, searchTerm2]);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Debounced Search</h2>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Type to search..."
        style={{ padding: "8px", fontSize: "16px", width: "300px" }}
      />
      <p>
        Immediate Input: <strong>{value}</strong>
      </p>
      <p>
        Debounced Search Term: <strong>{searchTerm}</strong>
      </p>
    </div>
  );
}
