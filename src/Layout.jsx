import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ScrollToTop } from "./components/ScrollToTop";

export default function Layout() {
  return (
    <div className="font-display flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
