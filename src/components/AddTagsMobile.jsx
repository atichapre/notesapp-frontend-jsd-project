import React, { useState } from "react";
import { useNoteContext } from "../../Context/noteContext";

function TagInputMobile() {
  // const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { onSubmitTag, setIsOpen } = useNoteContext();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="flex justify-between">
      <input
        type="text"
        value={inputValue}
        placeholder="Add tag "
        onChange={handleInputChange}
      />

      <button
        className="mt-2 rounded bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-700"
        onClick={() => {
          if (inputValue.trim()) {
            onSubmitTag(inputValue.trim());
            // setTags((prev) => [...prev, inputValue.trim()]);
            setInputValue("");
          }
          setIsOpen(false);
        }}
      >
        Add
      </button>
    </div>
  );
}

export default TagInputMobile;
