import { Link } from "react-router-dom";
import noteLogo from "../assets/note-only.png";
import noteText from "../assets/note-text.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const Navigate = useNavigate();

  const handleLogin = async () => {
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const response = await axios.post(
        "https://notesapp-backend-jsd-project.onrender.com/auth/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 200) {
        setTimeout(() => {
          Navigate("/");
        }, 2000);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", response.data.email);
        setIsLoggedIn(true);
        setTimeout(() => {
          setIsLoggedIn(false);
        }, 2000);
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError(true);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <main>
      <div className="h-fit w-full bg-[#f5f4f3]">
        <div className="container__div">
          <section className="flex min-h-screen w-full flex-col items-center justify-center gap-4">
            {/* Icon Section */}
            <section className="flex w-full flex-col items-center justify-center gap-4 text-black">
              <img
                src={noteLogo}
                alt="NotesApp Logo"
                className="w-[15%] sm:max-md:w-[50%]"
              />
              <img
                src={noteText}
                alt="NotesApp Text"
                className="w-[20%] sm:max-md:w-[50%]"
              />
              <div className="flex text-center text-xl sm:max-md:w-[80%] sm:max-md:text-lg">
                <p>
                  Welcome to NotesApp!
                  <span>
                    {" "}
                    Your thoughts, plans, and ideas - all in one place.
                  </span>
                </p>
              </div>
            </section>
            <section className="flex w-full flex-col items-center justify-center gap-4 text-black lg:w-1/2">
              <h1 className="flex text-3xl font-bold">Login</h1>
              {isLoggedIn ? (
                <p>Login Successfully!</p>
              ) : (
                error && <p>Invalid Email and Password</p>
              )}

              {/* Sign In Form */}
              <form
                action={handleLogin}
                className="flex w-full flex-col items-center justify-center gap-4"
              >
                <input
                  type="email"
                  placeholder="Email"
                  className="w-[80%] rounded-2xl bg-white px-4 py-2 text-xl text-black sm:max-md:text-base md:w-[35%] lg:w-[50%]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="Password"
                  className="w-[80%] rounded-2xl bg-white px-4 py-2 text-xl text-black sm:max-md:text-lg md:w-[35%] lg:w-[50%]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <div className="flex w-[65%] flex-col items-center justify-center gap-4 md:w-[35%] lg:w-[50%]">
                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full rounded-2xl bg-[#6f61f2] px-4 py-2 text-xl font-semibold text-white hover:cursor-pointer"
                  >
                    Login
                  </button>

                  {/* Register Button */}
                  <div className="w-full text-center text-xl font-semibold sm:max-md:text-lg">
                    <p className="w-full px-4 py-2">No Account?</p>
                    <Link to="/register" className="hover:underline">
                      Have a new one here!
                    </Link>
                  </div>
                </div>
              </form>
            </section>
          </section>
        </div>
      </div>
    </main>
  );
}
