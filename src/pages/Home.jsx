import axios from "axios";
import { useEffect, useState } from "react";
import PopoverInput from "../components/PopOverInput";
import labelIcon from "../assets/label-outline.svg";
import TagInputMobile from "../components/AddTagsMobile";
import { useNoteContext } from "../../Context/noteContext";
import { TokenExpiredNotification } from "../../Context/tokenExpiredNotification";

export default function Home() {
  const [notes, setNotes] = useState([]);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const token = localStorage.getItem("token");
  const {
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
  } = useNoteContext();

  const getNotes = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await axios.get(
        "https://notesapp-backend-jsd-project.onrender.com/notes",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );

      setNotes(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error(
        "Error fetching notes:",
        error.response?.data || error.message,
      );
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  const createNote = async () => {
    try {
      title,
        content,
        isPinned,
        tags,
        await axios.post(
          "https://notesapp-backend-jsd-project.onrender.com/notes",
          { title, content, isPinned, tags },

          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          },
        );

      setTitle("");
      setContent("");
      setIsPinned(false);
      setTags([]);
      setEditingNoteId(null);
      await getNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(
        `https://notesapp-backend-jsd-project.onrender.com/notes/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );

      await getNotes();
    } catch (error) {
      console.log(error);
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

  const saveEditedNote = async () => {
    if (!editingNoteId) return;

    try {
      title,
        content,
        isPinned,
        tags,
        await axios.put(
          `https://notesapp-backend-jsd-project.onrender.com/notes/${editingNoteId}`,
          { title, content, isPinned, tags },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          },
        );
      setEditingNoteId(null);
      setTitle("");
      setTags([]);
      setContent("");
      await getNotes();
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

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

  const togglePinned = async (noteId, currentPinned) => {
    try {
      await axios.patch(
        `https://notesapp-backend-jsd-project.onrender.com/notes/${noteId}`,
        {
          isPinned: !currentPinned,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      await getNotes();
    } catch (error) {
      console.error(
        "Error toggling pinned status:",
        error.response?.data || error.message,
      );
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const limitContentLength = (content) => {
    const words = content.split(/\s+/);
    if (words.length <= 20) {
      return content;
    }
    return words.slice(0, 20).join(" ") + "...";
  };

  return (
    <main>
      <div className="container__div">
        <TokenExpiredNotification />
        <div className="flex flex-row sm:max-md:flex-col">
          {/* Note Sidebar */}
          <div className="flex w-[25%] flex-col sm:max-md:w-full">
            <button
              className="m-5 rounded-md bg-[#6f61f2] p-2 text-white sm:max-md:hidden"
              onClick={() => {
                if (!title.trim() || !content.trim()) {
                  alert("Please fill title and content");
                } else {
                  if (editingNoteId) {
                    saveEditedNote();
                  } else {
                    createNote();
                  }

                  setIsFullScreenFormOpen(false);
                }
              }}
            >
              {editingNoteId ? "Save" : "Add Note"}
            </button>
            {editingNoteId ? (
              <button
                className="m-5 rounded-md bg-[#6f5555] p-2 text-white sm:max-md:hidden"
                onClick={() => {
                  setEditingNoteId(null);
                  setTitle("");
                  setContent("");
                  setTags([]);
                }}
              >
                Undo
              </button>
            ) : null}

            <div>
              {[...notes]
                .sort((a, b) => (b.isPinned === true) - (a.isPinned === true))
                .map((note) => (
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
                        onClick={() => togglePinned(note._id)}
                      >
                        <path
                          id="Union"
                          className="text-blue-800 hover:cursor-pointer"
                          fill={note.isPinned ? "currentColor" : "#d5d7de"}
                          fillRule="evenodd"
                          d="m23 9 -8 -8 -3 5 -9.00005 4 4.7929 4.7929 -6.5 6.5 1.41421 1.4142 6.5 -6.5L14 21l4 -9 5 -3Z"
                          clipRule="evenodd"
                          strokeWidth="1"
                        ></path>
                      </svg>
                    </div>
                    <p className="h-40 w-full text-sm">
                      {limitContentLength(note.content)}
                    </p>
                    <p className>{showNoteTags(note.tags)}</p>

                    <p>
                      {new Date(note.updatedAt).toLocaleString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <div className="flex justify-between">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        onClick={() => deleteNote(note._id)}
                        width="24px"
                        fill="currentColor"
                      >
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                      </svg>

                      <button
                        className="hover:cursor-pointer"
                        onClick={() => {
                          handleEdit(note);
                          handleScrollToTop();
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          {/* Note Form */}
          <div className="flex w-[75%] px-5">
            <div className="flex w-full flex-col sm:max-md:hidden">
              <div className="my-5 flex justify-between">
                <p className="text-2xl">{showNoteTags(tags, deleteTag)}</p>
                {editingNoteId ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="40px"
                    viewBox="0 -960 960 960"
                    className="hover:cursor-pointer"
                    onClick={() => {
                      if (editingNoteId) deleteNote(editingNoteId);
                      setEditingNoteId(null);
                      setTitle("");
                      setContent("");
                      setTags([]);
                      setIsPinned(false);
                    }}
                    width="40px"
                    fill="currentColor"
                  >
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                  </svg>
                ) : null}
              </div>
              <div className="flex justify-between">
                <input
                  className="w-[95%] py-4 text-4xl"
                  type="text"
                  value={title}
                  placeholder="Enter a title..."
                  onChange={(e) => setTitle(e.target.value)}
                ></input>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  id="Pin-1--Streamline-Sharp"
                  height="40"
                  width="40"
                >
                  <path
                    id="Union"
                    className="text-blue-800 hover:cursor-pointer"
                    fill={isPinned ? "currentColor" : "#d5d7de"}
                    fill-rule="evenodd"
                    d="m23 9 -8 -8 -3 5 -9.00005 4 4.7929 4.7929 -6.5 6.5 1.41421 1.4142 6.5 -6.5L14 21l4 -9 5 -3Z"
                    clip-rule="evenodd"
                    stroke-width="1"
                    onClick={() => setIsPinned(!isPinned)}
                  ></path>
                </svg>
                <img
                  src={labelIcon}
                  className="h-10 w-10 hover:cursor-pointer"
                  onClick={() => {
                    setIsPopoverOpen(!isPopoverOpen);
                  }}
                ></img>
              </div>
              <textarea
                className="min-h-screen text-xl"
                placeholder="Take Note..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
          </div>
          <PopoverInput
            isOpen={isPopoverOpen}
            setIsOpen={setIsPopoverOpen}
            onSubmitTag={(newTag) =>
              setTags((prev) => [
                ...prev,
                ...(Array.isArray(newTag) ? newTag.map(String) : [newTag]),
              ])
            }
          />
        </div>
        {isFullScreenFormOpen && (
          <div className="fixed inset-0 z-50 overflow-auto bg-white p-10 min-[768px]:hidden">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {editingNoteId ? "Edit Note" : "Add Note"}
              </h2>
              <button
                className="text-xl text-red-500 min-[768px]:hidden"
                onClick={() => setIsFullScreenFormOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="flex w-full flex-col min-[768px]:hidden">
              <p className="mt-10 h-full text-2xl">
                {showNoteTags(tags, deleteTag)}
              </p>

              <div className="flex justify-between">
                <input
                  className="w-[95%] py-4 text-2xl"
                  type="text"
                  value={title}
                  placeholder="Enter a title..."
                  onChange={(e) => setTitle(e.target.value)}
                ></input>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  id="Pin-1--Streamline-Sharp"
                  height="30"
                  width="30"
                >
                  <path
                    id="Union"
                    className="text-blue-800"
                    fill={isPinned ? "currentColor" : "#d5d7de"}
                    fill-rule="evenodd"
                    d="m23 9 -8 -8 -3 5 -9.00005 4 4.7929 4.7929 -6.5 6.5 1.41421 1.4142 6.5 -6.5L14 21l4 -9 5 -3Z"
                    clip-rule="evenodd"
                    stroke-width="1"
                    onClick={() => setIsPinned(!isPinned)}
                  ></path>
                </svg>
              </div>
              <textarea
                className="h-100 text-xl"
                placeholder="Take Note..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>

            <TagInputMobile
              isOpen={isPopoverOpen}
              setIsOpen={setIsPopoverOpen}
              onSubmitTag={(newTag) =>
                setTags((prev) => [
                  ...prev,
                  ...(Array.isArray(newTag) ? newTag.map(String) : [newTag]),
                ])
              }
            />
            <button
              className="my-5 w-full rounded-md bg-[#6f61f2] p-2 text-white min-lg:hidden"
              onClick={() => {
                if (!title.trim() || !content.trim()) {
                  alert("Please fill title and content");
                } else {
                  if (editingNoteId) {
                    saveEditedNote();
                  } else {
                    createNote();
                  }

                  setIsFullScreenFormOpen(false);
                }
              }}
            >
              {editingNoteId ? "Save" : "Add Note"}
            </button>
          </div>
        )}

        <button
          className="fixed right-5 bottom-6 z-40 h-10 w-10 rounded-full bg-[#6f61f2] pb-1 text-3xl text-white shadow-lg min-[768px]:hidden"
          onClick={() => {
            setEditingNoteId(null);
            setTitle("");
            setContent("");
            setTags([]);
            setIsPinned(false);
            setIsFullScreenFormOpen(true);
          }}
        >
          +
        </button>
      </div>
    </main>
  );
}
