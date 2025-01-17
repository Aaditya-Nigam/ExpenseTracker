import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AppLayout } from "./components/Layout/AppLayout";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";

import "./App.css"
import { Expense } from "./pages/Expense";
import { Analysis } from "./pages/Analysis";
import { Contact } from "./pages/Contact";

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
      },
      {
        path:"/analysis",
        element: <Analysis/>
      },
      {
        path: "/contact",
        element: <Contact/>
      }
    ]
  }])


  return <RouterProvider router={router}></RouterProvider>
}

export default App;