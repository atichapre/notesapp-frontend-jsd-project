import { useState, useRef } from "react";

export default function PopoverInput({ isOpen, setIsOpen, onSubmitTag }) {
  const [inputValue, setInputValue] = useState("");
  const popoverRef = useRef(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="relative inline-block">
      {isOpen && (
        <div
          ref={popoverRef}
          className="relative top-10 right-0 z-10 mt-2 flex w-64 flex-col rounded-lg border border-gray-300 bg-white p-4 shadow-lg"
        >
          <label className="block text-sm font-medium text-gray-700">
            Add Tags
          </label>

          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="h-10 text-sm"
            placeholder="Type personal, work or anything..."
          />
          <button
            className="mt-2 rounded bg-blue-500 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700"
            onClick={() => {
              if (inputValue.trim()) {
                onSubmitTag(inputValue.trim()); // Add trimmed input to tags
                setInputValue("");
                setIsOpen(false);
              }
            }}
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
}
