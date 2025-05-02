import { Link } from "react-router-dom";
// import Hamburger from "./Hamburger";
import noteLogo from "../assets/note-only.png";
import noteText from "../assets/note-text.png";
export default function Navbar() {
  return (
    <>
      <div className="sticky top-0 z-50 bg-[#f5f4f3]">
        <div className="container__div">
          <div className="flex h-[64px] flex-row justify-between px-[24px] py-1 text-black sm:max-md:px-0">
            <div className="flex flex-row">
              {/* Hamburger Menu */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                width="64px"
                fill="var(--color-text)"
                href="javascript:void(0);"
                className="min-[1024px]:hidden"
              >
                <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
              </svg>
              <Link
                to="/"
                className="flex flex-row items-center sm:max-md:hidden"
              >
                <img src={noteLogo} alt="onlyLogo" className="h-[70%]" />
                <img src={noteText} alt="logotext" className="h-[70%]" />
              </Link>
            </div>
            {/* Search Bar */}
            <div className="flex w-[50%] items-center rounded-2xl bg-white sm:max-md:hidden">
              <input
                type="text"
                placeholder="Search"
                className="w-full rounded-s-lg p-[12px] border-none transition-all duration-300"
              />

              <Link to={"/search"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="bg-text rounded-s-lg p-1"
                  viewBox="0 -960 960 960"
                  width="36px"
                  fill="#d9d9d9"
                >
                  <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                </svg>
              </Link>
            </div>

            <Link className="text-blue w-[10%] items-center py-3 text-center text-xl">
              Log out
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
