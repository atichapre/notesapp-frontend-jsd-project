import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ScrollToTop } from "./components/ScrollToTop";
import { SearchFunction } from "./components/SearchFunction";
import { useState, useEffect } from "react";

export default function Layout() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [isPinned, setIsPinned] = useState(false);
  const [isFullScreenFormOpen, setIsFullScreenFormOpen] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      setShowSearch(searchTerm.trim() !== "");
    }, 300); // Smooth transition

    return () => clearTimeout(delay);
  }, [searchTerm]);

  useEffect(() => {
    if (showSearch) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [showSearch]);

  return (
    <>
      <div className="font-display flex min-h-screen flex-col">
        <ScrollToTop />
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setShowSearch={setShowSearch}
          showSearch={showSearch}
        />

        {showSearch && (
          <SearchFunction
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setEditingNoteId={setEditingNoteId}
            setShowSearch={setShowSearch}
            setTitle={setTitle}
            setContent={setContent}
            setTags={setTags}
            setIsPinned={setIsPinned}
            setIsFullScreenFormOpen={setIsFullScreenFormOpen}
          />
        )}

        {!showSearch && (
          <Outlet
            context={{
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
            }}
          />
        )}
      </div>
    </>
  );
}
