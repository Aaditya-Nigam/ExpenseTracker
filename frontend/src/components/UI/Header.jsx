import { useState } from "react"
import { NavLink } from "react-router-dom"

export const Header=()=>{

    const [userPopUp,setUserPopUp]=useState(true);

    const handleUserPopUp=()=>{
        setUserPopUp((prev)=>{
            return !prev;
        })
    }

    return (
        <header className="bg-slate-100 shadow-md">
            <div className="header_container w-3/4 mx-auto flex justify-between items-center px-4 py-2">
                <div className="logo_container">
                    <img src="logo.jpg" alt="ExpenseMate"  className="rounded-full h-16 border-2 border-black"/>
                </div>
                <nav>
                    <ul className="flex gap-12 text-xl items-center">
                        <li>
                            <NavLink to="/" className="hover:underline">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/expense" className="hover:underline">Expense</NavLink>
                        </li>
                        <li>
                            <NavLink to="/analysis" className="hover:underline">Analysis</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact" className="hover:underline">Contact Us</NavLink>
                        </li>
                        <li>
                            <img src="user.png" alt="" className="h-8" onClick={handleUserPopUp}/>
                            <div className={`bg-white px-4 py-1 text-sm absolute shadow-lg m-1 ${userPopUp?"hidden":""}`}>
                                <ul>
                                    <li className="border-b border-slate-300 py-1">aaditya@gmail.com</li>
                                    <li className="border-b border-slate-300 py-1">Logout</li>
                                </ul>
                            </div>
                        </li>
                    </ul>

                </nav>
            </div>
        </header>
    )
}