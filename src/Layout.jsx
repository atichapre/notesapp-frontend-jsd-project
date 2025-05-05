import { NoteProvider, useNoteContext } from "../Context/noteContext";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ScrollToTop } from "./components/ScrollToTop";
import { SearchFunction } from "./components/SearchFunction";

function LayoutContent() {
  const {
    showSearch,
    searchTerm,
    setSearchTerm,
    setEditingNoteId,
    setShowSearch,
    setTitle,
    setContent,
    setTags,
    setIsPinned,
    setIsFullScreenFormOpen,
    editingNoteId,
    title,
    content,
    tags,
    isPinned,
    isFullScreenFormOpen,
  } = useNoteContext();

  return (
    <div className="font-display flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      {showSearch ? (
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
      ) : (
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
  );
}

export default function Layout() {
  return (
    <NoteProvider>
      <LayoutContent />
    </NoteProvider>
  );
}
