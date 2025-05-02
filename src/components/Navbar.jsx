import { Link } from "react-router-dom";
// import Hamburger from "./Hamburger";
import noteLogo from "../assets/notelogo.jpg";
export default function Navbar() {
  return (
    <>
      <div className="sticky top-0 z-50 bg-black">
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
              </Link>
            </div>
            <div className="flex flex-row justify-end gap-5">
              {/* Search Bar */}
              <div className="flex w-[50%] items-center rounded-2xl bg-white sm:max-md:hidden">
                <input
                  type="text"
                  placeholder="Search"
                  className="hover:border-lightgray bg-text my-[5%] h-[65%] w-full rounded-s-lg border-none p-[12px] text-black transition-all duration-300 focus:border-[2px] focus:border-gray-500"
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

              <Link className="my-2 block w-[30%] rounded-xl bg-gray-600 p-[8px] text-center text-[16px] text-white hover:bg-[#bc7142cb]">
                Log out
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
