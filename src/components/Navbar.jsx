import { Link } from "react-router-dom";
import { useNoteContext } from "../../Context/noteContext";
import noteLogo from "../assets/note-only.png";
import noteText from "../assets/note-text.png";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { searchTerm, setSearchTerm, setShowSearch } = useNoteContext();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
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

              <Link
                to="/login"
                className="text-blue mx-2 w-[10%] items-center py-3 text-center text-xl sm:max-md:w-[20%]"
                onClick={handleLogout}
              >
                Log out
              </Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="50px"
                viewBox="0 -960 960 960"
                width="50px"
                fill="currentColor"
              >
                <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
