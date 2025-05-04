import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function EditNote() {
  const { id } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3010/notes/${id}`)
        .then((res) => setNote(res.data))
        .catch((err) => console.error("Failed to fetch note:", err));
    }
  }, [id]);

  if (!note) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <input
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
        className="mb-2 w-full border p-2"
      />
      <textarea
        value={note.content}
        onChange={(e) => setNote({ ...note, content: e.target.value })}
        className="h-60 w-full border p-2"
      />
    </div>
  );
}
