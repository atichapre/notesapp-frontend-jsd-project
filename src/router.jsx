import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
// import Register from "./pages/Register";
import Search from "./pages/Search";
import About from "./pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // { path: "/", element: <Home /> },
      // { path: "about", element: <About /> },
      // { path: "login", element: <Login /> },
      // { path: "register", element: <Register /> },
      // { path: "search", element: <Search /> },
    ],
  },
]);

export default router;
