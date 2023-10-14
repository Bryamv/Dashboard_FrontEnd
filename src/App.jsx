import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import LogPage from "./pages/LogPage";
import ConsultPage from "./pages/ConsultPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        //path: "/", another way to write it
        index: true,
        element: <HomePage />,
      },
      {
        path: "/register",
        element: <CreatePage />,
      },
      {
        path: "/consult",
        element: <ConsultPage />,
      },
      {
        path: "/log",
        element: <LogPage />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
