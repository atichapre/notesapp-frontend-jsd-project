import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [isPinned, setIsPinned] = useState(false);
  const [isFullScreenFormOpen, setIsFullScreenFormOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const onSubmitTag = (tag) => {
    setTags((prevTags) => [...prevTags, tag]);
  };
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (showSearch) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [showSearch]);

  return (
    <NoteContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        showSearch,
        setShowSearch,
        editingNoteId,
        setEditingNoteId,
        title,
        setTitle,
        content,
        setContent,
        tags,
        setTags,
        isPinned,
        setIsPinned,
        isFullScreenFormOpen,
        setIsFullScreenFormOpen,
        isOpen,
        setIsOpen,
        onSubmitTag,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export const useNoteContext = () => useContext(NoteContext);
