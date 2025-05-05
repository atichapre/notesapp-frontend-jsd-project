import { Link } from "react-router-dom";
import noteLogo from "../assets/note-only.png";
import noteText from "../assets/note-text.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const Navigate = useNavigate();

  const handleLogin = async () => {
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const response = await axios.post(
        "http://localhost:3010/auth/login",
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
        setIsLoggedIn(true);
        setTimeout(() => {
          setIsLoggedIn(false);
        }, 2000);
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main>
      <div className="h-fit w-full bg-[#f5f4f3]">
        <div className="container__div">
          <section className="flex min-h-screen w-full flex-col items-center justify-center gap-4">
            {/* Icon Section */}
            <section className="flex w-full flex-col items-center justify-center gap-4 text-black">
              <img src={noteLogo} alt="NotesApp Logo" className="w-[10%]" />
              <img
                src={noteText}
                alt="NotesApp Text"
                className="w-[30%] md:w-[15%]"
              />
              <p className="w-fit text-xl">
                Welcome to NotesApp! Your thoughts, plans, and ideas — all in
                one place.
              </p>
            </section>
            <section className="flex w-full flex-col items-center justify-center gap-4 text-black lg:w-1/2">
              <h1 className="flex text-3xl font-bold">Login</h1>
              {isLoggedIn && <p>Login Successful!</p>}
              {/* Sign In Form */}
              <form
                action={handleLogin}
                className="flex w-full flex-col items-center justify-center gap-4"
              >
                <input
                  type="email"
                  placeholder="Email"
                  className="w-[65%] rounded-2xl bg-white px-4 py-2 text-xl text-black md:w-[35%] lg:w-[50%]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="Password"
                  className="w-[65%] rounded-2xl bg-white px-4 py-2 text-xl text-black md:w-[35%] lg:w-[50%]"
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
                  <Link to="/register" className="w-full">
                    <button className="w-full rounded-2xl px-4 py-2 text-xl font-semibold hover:cursor-pointer">
                      No Account? Have a new one here!
                    </button>
                  </Link>
                </div>
              </form>
            </section>
          </section>
        </div>
      </div>
    </main>
  );
}
