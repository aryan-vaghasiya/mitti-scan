import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Scanner from "./pages/Scanner";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import History from "./pages/History";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/scan",
        element: <Scanner />,
      },
      {
        path: "/history",
        element: <History />
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App