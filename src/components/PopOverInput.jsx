import { useState, useRef, useEffect } from "react";

export default function PopoverInput({ isOpen, setIsOpen, onSubmitTag }) {
  const [inputValue, setInputValue] = useState("");
  const popoverRef = useRef(null);

  // Close popover if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpen]);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="relative inline-block">
      {isOpen && (
        <div
          ref={popoverRef}
          className="absoluteright-0 z-10 mt-2 flex w-64 flex-col rounded-lg border border-gray-300 bg-white p-4 shadow-lg"
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
                setInputValue([]); // Reset input field
              }
              setIsOpen(false);
            }}
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
}
