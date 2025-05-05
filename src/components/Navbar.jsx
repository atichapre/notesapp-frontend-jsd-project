import { Link } from "react-router-dom";
import { useNoteContext } from "../../Context/noteContext";
import noteLogo from "../assets/note-only.png";
import noteText from "../assets/note-text.png";
// import { useNavigate } from "react-router-dom";
import ProfileUserPopover from "./ProfileUserPopover";

export default function Navbar() {
  const { searchTerm, setSearchTerm, setShowSearch } = useNoteContext();
  // const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <>
      {token && (
        <div className="sticky top-0 z-50 bg-[#f5f4f3]">
          <div className="container__div">
            <div className="flex h-[64px] flex-row justify-between px-[24px] py-1 text-black sm:max-md:px-0">
              <div className="flex flex-row">
                <Link
                  to="/"
                  className="flex flex-row items-center sm:max-md:hidden"
                  onClick={() => window.location.reload()}
                >
                  <img src={noteLogo} alt="onlyLogo" className="h-[70%]" />
                  <img src={noteText} alt="logotext" className="h-[70%]" />
                </Link>
              </div>
              {/* Search Bar */}
              <div className="relative flex w-[50%] items-center rounded-2xl bg-white">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowSearch(true);
                  }}
                  className="w-full rounded-lg border p-2 pr-10"
                />

                {/* X icon - shows when search is active */}
                {searchTerm.length > 0 && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 0 24 24"
                    className="absolute right-10 cursor-pointer"
                    width="24"
                    onClick={() => {
                      setSearchTerm("");
                      setShowSearch(false);
                    }}
                    fill="currentColor"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M18.3 5.71a.996.996 0 00-1.41 0L12 10.59 7.11 5.7a.996.996 0 10-1.41 1.41L10.59 12l-4.89 4.89a.996.996 0 101.41 1.41L12 13.41l4.89 4.89a.996.996 0 101.41-1.41L13.41 12l4.89-4.89c.39-.39.39-1.02 0-1.41z" />
                  </svg>
                )}

                {/* Search icon (always visible) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  className="absolute right-2"
                  width="24px"
                  fill="#d9d9d9"
                >
                  <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                </svg>
              </div>

              <ProfileUserPopover />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
