import { useEffect, useState } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { NavLink, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

export const Expense=()=>{

    const [data,setData]=useState(null);
    const [updatedData,setUpdatedData]=useState(null);
    const [filter,setFilter]=useState("All");
    const [fromTo,setFromTo]=useState({from: "", to: ""});
    const [showDate,setShowDate]=useState(null)
    const navigate=useNavigate();

    const isLoggedin=async ()=>{
        const response=await fetch("http://localhost:5000/api/user/isLoggedin",{
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        const result=await response.json();
        if(!response.ok){
            navigate("/login");
        }
    }

    useEffect(()=>{
        isLoggedin();
    },[])

    const fetchData=async ()=>{
        const response=await fetch("http://localhost:5000/api/expense",{
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        const result=await response.json();
        if(!response.ok){
            console.log(result.error);
        }else{
            console.log(result);
            setData(result);
            setUpdatedData(result);
        }
    }

    useEffect(()=>{
        fetchData();
    },[])

    const onFilterChange=(category)=>{
        switch(category){
            case "All":
                setUpdatedData(data)
                setFilter("All")
                break;
            case "Food":
                let food=data.filter((ele)=>{
                    return ele.category=="Food";
                })
                setUpdatedData(food);
                setFilter("Food")
                break;
            case "Rent":
                let rent=data.filter((ele)=>{
                    return ele.category=="Rent";
                })
                setUpdatedData(rent);
                setFilter("Rent")
                break;
            case "Travel":
                const travel=data.filter((ele)=>{
                    return ele.category=="Travel";
                })
                setUpdatedData(travel);
                setFilter("Travel")
                break;
            case "Cloth":
                const cloth=data.filter((ele)=>{
                    return ele.category=="Cloth";
                })
                setUpdatedData(cloth);
                setFilter("Cloth")
                break;
            case "Salary":
                const salary=data.filter((ele)=>{
                    return ele.category=="Salary";
                })
                setUpdatedData(salary);
                setFilter("Salary")
                break;
            case "Credit":
                const credit=data.filter((ele)=>{
                    return ele.transactionType=="Credit";
                })
                setUpdatedData(credit);
                setFilter("Credit")
                break;
            case "Debit":
                const debit=data.filter((ele)=>{
                    return ele.transactionType=="Debit";
                })
                setUpdatedData(debit);
                setFilter("Debit")
                break;
            
        }
    }

    const handleOnChange=(e)=>{
        setFromTo({...fromTo,[e.target.name]:e.target.value})
    }

    const handleFormSubmit=(e)=>{
        e.preventDefault();
        const lst=data.filter((ele)=>{
            return (ele.createdAt.split('T')[0] >= fromTo.from && ele.createdAt.split('T')[0] <= fromTo.to);
        })
        setUpdatedData(lst);
        setShowDate(fromTo);
        setFromTo({from:"" , to:""})
    }

    const handleCancel=()=>{
        setShowDate(null);
        setUpdatedData(data);
    }

    const handleDeleteExpense=async (id)=>{
        const response=await fetch(`http://localhost:5000/api/expense/${id}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        const result=await response.json();
        if(!response.ok){
            console.log(result.error)
        }else{
            console.log(result);
            const lst=updatedData.filter((dat)=>{
                return dat._id!=id;
            })
            setUpdatedData(lst);
        }
    }

    return (
        <main className="grid grid-cols-[2fr_13fr] h-[630px]">
            <div className="left bg-rose-30 h-full shadow-lg px-4 py-4">
                <div>
                    <div className="flex gap-4 items-center text-lg pb-4">
                        <HiOutlineMenuAlt2/>
                        <h3>Filters</h3>
                    </div>
                    <ul className="flex flex-col gap-2">
                        <li onClick={()=> onFilterChange("All")} className={`${filter=="All"? 'text-sky-500':""} cursor-pointer`}>
                            All
                        </li>
                        <li onClick={()=> onFilterChange("Food")} className={`${filter=="Food"? 'text-sky-500':""} cursor-pointer`}>
                            Food
                        </li>
                        <li onClick={()=> onFilterChange("Rent")} className={`${filter=="Rent"? 'text-sky-500':""} cursor-pointer`}>
                            Rent
                        </li>
                        <li onClick={()=> onFilterChange("Travel")} className={`${filter=="Travel"? 'text-sky-500':""} cursor-pointer`}>
                            Travel
                        </li>
                        <li onClick={()=> onFilterChange("Cloth")} className={`${filter=="Cloth"? 'text-sky-500':""} cursor-pointer`}>
                            Cloth
                        </li>
                        <li onClick={()=> onFilterChange("Salary")} className={`${filter=="Salary"? 'text-sky-500':""} cursor-pointer`}>
                            Salary
                        </li>
                        <li onClick={()=> onFilterChange("Credit")} className={`${filter=="Credit"? 'text-sky-500':""} cursor-pointer`}>
                            Credit
                        </li>
                        <li onClick={()=> onFilterChange("Debit")} className={`${filter=="Debit"? 'text-sky-500':""} cursor-pointer`}>
                            Debit
                        </li>
                    </ul>
                </div>
            </div>
            <div className="right h-full p-4">
                <h1 className="text-center text-3xl pb-4">Expenses</h1>
                <form className="px-4  w-4/5 mx-auto" onSubmit={handleFormSubmit}>
                    <div className="flex gap-4 items-center">
                        <p className="text-xl">Date: </p>
                        <div className="flex flex-cl gap-8">
                            <div>
                                <label htmlFor="from">From: </label>
                                <input type="date" name="from" id="from" className="bg-sky-100 px-2 rounded-lg" value={fromTo?fromTo.from:""} onChange={handleOnChange}required/>
                            </div>
                            <div>
                                <label htmlFor="to">To: </label>
                                <input type="date" name="to" id="to" className="bg-sky-100 px-2 rounded-lg" value={fromTo?fromTo.to:""} onChange={handleOnChange} required/>
                            </div>
                            <input type="submit" value="Submit" className="bg-sky-400 px-4 rounded-xl text-white hover:bg-sky-500 cursor-pointer"/>
                        </div>
                    </div>
                    {
                        showDate?<div className="flex items-center gap-2 bg-sky-200 w-fit px-2 py-1 rounded text-sm mt-2">
                            <p>{showDate.from}&nbsp; - &nbsp;{showDate.to}</p>
                            <RxCross2 className="cursor-pointer" onClick={handleCancel}/>
                        </div>:""
                    }
                </form>
                <div className="border px-4 py-2 mt-4 w-4/5 mx-auto min-h-60 h-5/6 rounded-lg overflow-auto">
                    <p className="text-center">All expenses..</p>
                    
                    {
                        updatedData? updatedData.map((exp)=>{
                            return (
                                <div className="card flex justify-between border-b-2 border-slate-100 items-center px-4 py-2" key={exp._id}>
                                    <div>
                                        <div className="flex gap-4 items-center">
                                            <h3 className="text-md font-bold">{exp.title}</h3>
                                            <p className="text-sm">{exp.createdAt.split('T')[0]}</p>
                                            <div className="buttons flex gap-1 text-md items-center">
                                                <FaRegEdit className="cursor-pointer"/>
                                                <MdDeleteForever className="cursor-pointer" onClick={()=>handleDeleteExpense(exp._id)}/>
                                            </div>
                                        </div>
                                        <p className=" text-sm"><span className="font-semibold">Category:</span> {exp.category}</p>
                                    </div>
                                    <div className={`text-md ${exp.transactionType=="Debit"?'text-rose-500':'text-lime-600'}`}>
                                        Rs. {exp.amount}
                                    </div>
                                </div>
                            )
                        }):"empty"
                    }
                    
                    
                </div>
            </div>
        </main>
    )
}