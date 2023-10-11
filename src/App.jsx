import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import DeletePage from "./pages/DeletePage";
import LogPage from "./pages/LogPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        //path: "/", another way to write it
        index: true,
        element: <HomePage/>,
      },
      {
        path: "/create",
        element: <CreatePage/>,
      },
      {
        path: "/delete",
        element: <DeletePage/>,
      },
      {
        path: "/log",
        element: <LogPage/>,
      },
    ],
  },
]);

function App() {
  

  return (
    <>
    
    <RouterProvider router={router} />

    </>
  )
}

export default App
