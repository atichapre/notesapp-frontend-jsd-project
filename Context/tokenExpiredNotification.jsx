import { useEffect } from "react";
import { useMessage } from "./messageContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const TokenExpiredNotification = () => {
  const { message, setMessage } = useMessage();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://notesapp-backend-jsd-project.onrender.com/notes/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          if (err.response.data.code === "TOKEN_EXPIRED") {
            setMessage("Token expired, please log in again.");
            setTimeout(() => {
              localStorage.removeItem("token");
              navigate("/login");
            }, 3000);
          } else {
            alert("Authentication failed: " + err.response.data.message);
          }
        }
      });
  }, [navigate, setMessage]);

  return (
    <div>
      <p>{message}</p>
    </div>
  );
};
