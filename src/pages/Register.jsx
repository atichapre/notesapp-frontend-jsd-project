import React, { useState } from "react";
import {
  Container,
  TextField,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://notesapp-backend-jsd-project.onrender.com/auth/register",
        formData,
      );
      setMessage("Registration successful!");
      setFormData({ name: "", email: "", password: "" });
    } catch (err) {
      console.error(err);
      setMessage("Registration failed. Please try again.");
    }
  };

  return (
    <>
      <div className="flex min-h-screen w-full bg-[#f5f4f3] py-20">
        <Container maxWidth="xs" className="text-center">
          <Box sx={{ mt: 5 }}>
            <p className="pb-6 text-3xl font-bold">Register</p>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                margin="normal"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                margin="normal"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                margin="normal"
                value={formData.password}
                onChange={handleChange}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <button
                type="submit"
                className="mb-10 w-full rounded-2xl bg-[#6f61f2] px-4 py-2 text-xl font-semibold text-white hover:cursor-pointer"
              >
                Register
              </button>
              {message && <p>{message}</p>}
            </form>
            <Link
              to="/login"
              className="w-full rounded-2xl px-4 text-xl font-semibold hover:cursor-pointer"
            >
              Back to Login
            </Link>
          </Box>
        </Container>
      </div>
    </>
  );
}
