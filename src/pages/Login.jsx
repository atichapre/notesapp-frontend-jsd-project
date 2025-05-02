import { Link } from "react-router-dom";

import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <main>
      <div className="bg-greenBackground h-fit w-full">
        <div className="container__div">
          <section className="flex min-h-screen w-full flex-col items-center justify-center gap-4 lg:flex-row">
            {/* Icon Section */}
            <section className="text-text flex w-full flex-col items-center justify-center gap-4 lg:w-1/2">
              <img
                src="/src/assets/logo_katsubook.png"
                alt="Katsu Bookstore"
                className="hidden w-[50%] lg:flex"
              />
              <img
                src="/src/assets/logo_katsubook_no-text.png"
                alt="Katsu Bookstore"
                className="flex w-[35%] md:w-[15%] lg:hidden"
              />
              <p className="hidden w-fit lg:flex">
                Welcome to bookstore Everything in One place
              </p>
            </section>
            <section className="text-text flex w-full flex-col items-center justify-center gap-4 lg:w-1/2">
              <h1 className="flex font-bold">Login</h1>
              <p className="hidden md:flex lg:hidden">
                Welcome to bookstore Everything in One place
              </p>

              {/* Sign In Form */}
              <form
                action={handleLogin}
                className="flex w-full flex-col items-center justify-center gap-4"
              >
                <input
                  type="email"
                  placeholder="Email"
                  className="text-banner w-[65%] rounded-2xl bg-white px-4 py-2 md:w-[35%] lg:w-[50%]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="Password"
                  className="text-banner w-[65%] rounded-2xl bg-white px-4 py-2 md:w-[35%] lg:w-[50%]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <a href="">Forget Your password?</a>
                <div className="flex w-[65%] flex-col items-center justify-center gap-4 md:w-[35%] lg:w-[50%]">
                  <Separator />
                  <Button className="bg-buttonBrown w-full rounded-2xl px-4 py-2 font-semibold hover:cursor-pointer">
                    Login
                  </Button>
                  <p>or</p>

                  {/* Register Button */}
                  <Link to="/register" className="w-full">
                    <Button className="bg-buttonBlue w-full rounded-2xl px-4 py-2 font-semibold hover:cursor-pointer">
                      New Account
                    </Button>
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
