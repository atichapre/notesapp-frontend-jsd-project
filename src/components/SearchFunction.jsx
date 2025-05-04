import { useState, useEffect } from "react";
import axios from "axios";

export function SearchFunction({
  searchTerm,
  setEditingNoteId,
  setTitle,
  setContent,
  setTags,
  setIsPinned,
  setIsFullScreenFormOpen,
  setShowSearch,
  setSearchTerm,
}) {
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  const showNoteTags = (tagsArray, onDeleteTag) =>
    (tagsArray || []).map((tag, index) => (
      <span
        key={`${tag}-${index}`}
        className="mr-[8px] rounded-sm bg-yellow-200 px-[8px]"
      >
        {tag}
        {onDeleteTag && (
          <span
            onClick={() => onDeleteTag(tag)}
            className="ml-1 cursor-pointer text-sm"
          >
            ×
          </span>
        )}
      </span>
    ));

  const getNoteResults = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3010/search?query=${searchTerm}`,
        { headers: { Authorization: "Bearer " + token } },
      );

      console.log("Full response:", response);
      console.log("Response data:", response.data);

      if (Array.isArray(response.data.notes)) {
        setSearchResults(response.data.notes);
      } else if (response.data.items && Array.isArray(response.data.items)) {
        setSearchResults(response.data.items);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setError("Failed to fetch search results. Please try again later.");
      setSearchResults([]);
    }
  };

  const handleEdit = (note) => {
    setEditingNoteId(note._id);
    setTitle(note.title);
    setContent(note.content);
    setTags(note.tags.flat());
    setIsPinned(note.isPinned);
    setIsFullScreenFormOpen(true);
  };
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const fetchResults = async () => {
      if (searchTerm) {
        await getNoteResults();
      } else {
        setSearchResults([]); // Clear results when search term is empty
      }
    };
    fetchResults();
  }, [searchTerm]);

  useEffect(() => {
    console.log("Updated search results:", searchResults); // Debugging state updates
  }, [searchResults]);

  return (
    <div className="container__div">
      <div className="100 min-h-screen w-full p-4">
        {error && <p className="mt-2 text-red-500">{error}</p>}

        {searchResults.length > 0 ? (
          searchResults.map((note) => (
            <div key={note._id} className="border-b p-2">
              <div className="flex justify-between">
                <h2>{note.title}</h2>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  id="Pin-1--Streamline-Sharp"
                  height="20"
                  width="20"
                >
                  <path
                    id="Union"
                    className="text-blue-800"
                    fill={note.isPinned ? "currentColor" : "#d5d7de"}
                    fillRule="evenodd"
                    d="m23 9 -8 -8 -3 5 -9.00005 4 4.7929 4.7929 -6.5 6.5 1.41421 1.4142 6.5 -6.5L14 21l4 -9 5 -3Z"
                    clipRule="evenodd"
                    strokeWidth="1"
                  ></path>
                </svg>
              </div>
              <p className="h-40 w-full text-sm">{note.content}</p>
              <p className>{showNoteTags(note.tags)}</p>
              <div className="flex justify-between"></div>
              <button
                className="hover:cursor-pointer"
                onClick={() => {
                  handleEdit(note);
                  handleScrollToTop();
                  setShowSearch(false);
                  setSearchTerm("");
                }}
              >
                Edit
              </button>
            </div>
          ))
        ) : (
          <p className="mt-4 text-gray-500">No results found</p>
        )}
      </div>
    </div>
  );
}
