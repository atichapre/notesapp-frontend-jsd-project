import React, { useState } from "react";

function TagInputMobile({ onSubmitTag, setIsOpen }) {
  const [setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        placeholder="Add tag "
        onChange={handleInputChange}
      />

      <button
        className="mt-2 rounded bg-blue-500 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700"
        onClick={() => {
          if (inputValue.trim()) {
            onSubmitTag(inputValue.trim()); // Pass trimmed input to parent
            setTags((prev) => [...prev, inputValue.trim()]); // Add tag to local state
            setInputValue(""); // Reset input field
          }
          setIsOpen(false); // Close popover
        }}
      >
        Add
      </button>
    </div>
  );
}

export default TagInputMobile;
