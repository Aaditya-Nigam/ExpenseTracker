import { useState } from "react"

export const Contact=()=>{

    const [user,setUser]=useState({
        name: "",
        email: "",
        number: "",
        message: ""
    })

    const handleOnSubmit=(e)=>{
        e.preventDefault();
        console.log(user);
    }

    return (
        <main className="bg-sky-00 w-screen min-h-[600px]">
            <div className="w-[500px] border2 mx-auto p-2 py-16 my-8 rounded-xl bg-slate-100 text-whte">
                <h1 className="text-center text-3xl pb-4">Send us a message</h1>
                <form className="flex flex-col gap-8 items-center" onSubmit={handleOnSubmit}>
                    <div className="flex flex-col gap-4 w-3/5">
                        <div className="flex flex-col">
                            <label htmlFor="name">Name: </label>
                            <input type="text" name="name" id="name" placeholder="Enter your Name" value={user.name} onChange={(e)=>{setUser({...setUser,[e.target.name]: e.target.value})}} className="w-full rounded-md px-2 py-1 outline-none placeholder:text-sm" required/>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="name">Email: </label>
                            <input type="email" name="email" id="email" placeholder="Enter your Email" value={user.email} onChange={(e)=>{setUser({...setUser,[e.target.name]: e.target.value})}} className="w-full rounded-md px-2 py-1 outline-none placeholder:text-sm" required/>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="number">Phone Number: </label>
                            <input type="number" name="number" id="number" placeholder="Enter your Number" value={user.number} onChange={(e)=>{setUser({...setUser,[e.target.name]: e.target.value})}} className="w-full rounded-md px-2 py-1 outline-none placeholder:text-sm" required/>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="message">Message: </label>
                            <textarea name="message" id="message" placeholder="Enter your message" value={user.message} onChange={(e)=>{setUser({...setUser,[e.target.name]: e.target.value})}} className="w-full rounded-md px-2 py-1 outline-none placeholder:text-sm" required></textarea>
                        </div>
                    </div>
                    <input type="submit" value="Submit" className="bg-sky-400 w-[350px] text-center py-1 rounded-md text-white text-xl"/>
                </form>
            </div>
        </main>
    )
}