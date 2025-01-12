import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AppLayout } from "./components/Layout/AppLayout";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";

import "./App.css"
import { Expense } from "./pages/Expense";

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
      },
      {
        path: "/expense",
        element: <Expense/>
      }
    ]
  }])


  return <RouterProvider router={router}></RouterProvider>
}

export default App;