import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"

export const Register=()=>{

    const navigate=useNavigate();

    const [formData,setFormData]=useState({email: "",password: ""});
    const [error,setError]=useState(null)
    const [success,setSuccess]=useState(false)

    const handleOnChange=(e)=>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleFormSubmit=async (e)=>{
        e.preventDefault();
        console.log(formData);
        const response=await fetch("http://localhost:5000/api/user/register",{
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const result=await response.json();
        if(!response.ok){
            console.log(result.error);
            setError(result.error)
            setTimeout(()=>{
                setError(null)
            },1500)
        }else{
            console.log(result);
            setSuccess(true);
            setTimeout(()=>{
                navigate("/login")
            },2000)
        }
        setFormData({email: "",password: ""})
    }

    return (
        <main className="register_main_container w-screen h-screen flex items-center justify-center">
            <div className="register_container bordr-2 w-[500px] p-4">
                <h2 className="text-center text-3xl font-bold">Register</h2>
                <form className="flex flex-col items-center" onSubmit={handleFormSubmit}>
                    <div className="flex flex-col mt-6 w-full">
                        <label htmlFor="email" className="text-md text-slate-500">Email</label>
                        <input type="text" name="email" id="email" className="border-2 rounded-md px-2 outline-none" value={formData.email} onChange={handleOnChange} placeholder="Enter your email" required />
                    </div>
                    <div className="flex flex-col mt-6 w-full">
                        <label htmlFor="password" className="text-md text-slate-500">Password</label>
                        <input type="password" name="password" id="password" className="border-2 rounded-md px-2 outline-none" value={formData.password} onChange={handleOnChange} placeholder="Enter password" required />
                    </div>
                    {
                        error?<div className="w-full bg-rose-500 px-4 py-2 mt-2 text-white rounded-md">{error}</div>:""
                    }
                    {
                        success?<div className="w-full bg-lime-500 px-4 py-2 mt-2 text-white rounded-md">Redirecting...</div>:""
                    }
                    <button className="bg-sky-400 w-full px-6 py-2 rounded-lg text-white text-xl hover:bg-sky-500 mt-6">Register</button>
                    <p className="py-2">Already have an account? <NavLink to="/login" className="hover:underline hover:text-sky-800 font-mono">Login</NavLink></p>
                </form>
            </div>
        </main>
    )
}