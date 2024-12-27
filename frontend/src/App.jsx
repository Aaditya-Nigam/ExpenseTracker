import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AppLayout } from "./components/Layout/AppLayout";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";

const App=()=>{

  const router=createBrowserRouter([
    {
      path: "/register",
      element: <Register/>
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
    path: "/",
    element: <AppLayout/>,
    children: [
      {
        path: "/",
        element: <Home/>
      }
    ]
  }])


  return <RouterProvider router={router}></RouterProvider>
}

export default App;