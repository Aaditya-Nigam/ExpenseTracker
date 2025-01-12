import { useEffect, useState } from "react";
import { NavLink, useNavigate } from"react-router-dom"

export const Home=()=>{

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

    const [expense,setExpense]=useState({
        "title": "",
        "amount": 0,
        "category": "Other",
        "transactionType": "Debit"
    })

    const handleOnChange=(e)=>{
        setExpense({...expense,[e.target.name]: e.target.value})
    }

    const handleFormSubmit=async (e)=>{
        e.preventDefault();
        if(expense.amount==0){
            return;
        }
        const response=await fetch("http://localhost:5000/api/expense",{
            method: "POST",
            body: JSON.stringify(expense),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        const result=await response.json();
        if(!response.ok){
            console.log(result.error);
        }else{
            console.log(result);
        }
        setExpense({
            "title": "",
            "amount": 0,
            "category": "Other",
            "transactionType": "Debit"
        })
    }

    return (
        <main>
            <div className="home_container borr-2 w-3/4 mx-auto px-4 py-8">
                {/* <div className="bg-slate-100 w-3/5 mx-auto p-4 rounded-lg flex flex-col gap-2">
                    <h3 className="font-bold">Total Income: &nbsp;<span className="font-normal">Rs.13244</span></h3> 
                    <h3 className="font-bold">Total Spend: &nbsp;<span className="font-normal">Rs.13244</span></h3> 
                    <h3 className="font-bold">Max Spend at: &nbsp;<span className="font-normal">Rs.13244</span></h3> 
                </div> */}
                <form className="w-3/5 mx-auto p-4 flex flex-col justify-center gap-4 bg-slate-100 rounded-lg mt-4" onSubmit={handleFormSubmit}>
                    <div>
                        <label htmlFor="title">Title: </label>
                        <input type="text" name="title" id="title" placeholder="Enter new expense.." className="border-2 w-3/4 px-2 py-1 rounded-lg border-slate-100 outline-none" required value={expense.title} onChange={handleOnChange}/>
                    </div>
                    <div>
                        <label htmlFor="amount">Amount: </label>
                        <input type="number" name="amount" id="amount" placeholder="3201" className="border-2 w-3/4 px-2 py-1 rounded-lg border-slate-100 outline-none" required value={expense.amount} onChange={handleOnChange}/>
                    </div>
                    <div>
                        <label htmlFor="category">Category: </label>
                        <select name="category" id="category" className="px-8 py-1 rounded-lg outline-none" value={expense.category} onChange={handleOnChange}>
                            <option value="Other" className="bg-sky-100">Other</option>
                            <option value="Food" className="bg-sky-100">Food</option>
                            <option value="Rent" className="bg-sky-100">Rent</option>
                            <option value="Travel" className="bg-sky-100">Travel</option>
                            <option value="Salary" className="bg-sky-100">Salary</option>
                            <option value="Cloth" className="bg-sky-100">Cloth</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="transactionType">Transaction Type: </label>
                        <select name="transactionType" id="transactionType" className="px-8 py-1 rounded-lg outline-none" value={expense.transactionType} onChange={handleOnChange}>
                            <option value="Debit" className="bg-sky-100">Debit</option>
                            <option value="Credit" className="bg-sky-100">Credit</option>
                        </select>
                    </div>
                    <button className="bg-sky-500 py-1 text-xl rounded-lg text-white hover:bg-sky-400">Add</button>
                </form>
                <NavLink to="/expense" className="block w-3/5 mx-auto ps-4 text-slate-400 text-sm">View all expenses..</NavLink>
                <div className="py-12">
                    <h2 className="text-center text-4xl font-bold pb-4">Our Features</h2>
                    <div className="card-container grid grid-cols-3 px-4 gap-y-6">
                        <div className="card flex flex-col items-center gap-2 p-2 w-[300px]">
                            <img src="https://moneylover.me/img/features/1.svg" alt="feature1" />
                            <h3 className="text-xl font-semibold">Multiple devices</h3>
                            <p className="text-center text-md">Safely synchronize across devices with Bank standard security.</p>
                        </div>

                        <div className="card flex flex-col items-center gap-2 p-2 w-[300px]">
                            <img src="https://moneylover.me/img/features/2.svg" alt="feature1" />
                            <h3 className="text-xl font-semibold">Recurring transaction</h3>
                            <p className="text-center text-md">Get notified of recurring bills and transactions before due date.</p>
                        </div>

                        <div className="card flex flex-col items-center gap-2 p-2 w-[300px]">
                            <img src="https://moneylover.me/img/features/3.svg" alt="feature1" />
                            <h3 className="text-xl font-semibold">Travel mode</h3>
                            <p className="text-center text-md">All currencies supported with up-to-date exchange rate.</p>
                        </div>

                        <div className="card flex flex-col items-center gap-2 p-2 w-[300px]">
                            <img src="https://moneylover.me/img/features/4.svg" alt="feature1" />
                            <h3 className="text-xl font-semibold">Saving plan</h3>
                            <p className="text-center text-md">Keep track on savings process to meet your financial goals.</p>
                        </div>

                        <div className="card flex flex-col items-center gap-2 p-2 w-[300px]">
                            <img src="https://moneylover.me/img/features/5.svg" alt="feature1" />
                            <h3 className="text-xl font-semibold">Debt and loan</h3>
                            <p className="text-center text-md">Manage your debts, loans and payment process in one place.</p>
                        </div>

                        <div className="card flex flex-col items-center gap-2 p-2 w-[300px]">
                            <img src="https://moneylover.me/img/features/6.svg" alt="feature1" />
                            <h3 className="text-xl font-semibold">Effortless transaction entry</h3>
                            <p className="text-center text-md">Entry a transaction quickly and easily, manually or automatically.</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex gap-8 items-center w-3/4 mx-auto py-12">
                        <img src="https://moneylover.me/img/details/Transaction@4x.png" alt="" className="w-[350px] shadow-lg rounded-lg" />
                        <div>
                            <h3 className="text-4xl py-4">Simple money tracker</h3>
                            <p>It takes seconds to record daily transactions. Put them into clear and visualized categories such as Expense: Food, Shopping or Income: Salary, Gift.</p>
                        </div>
                    </div>
                    <div className="flex gap-8 items-center w-3/4 mx-auto py-12">
                        <div>
                            <h3 className="text-4xl py-4">Painless budgeting</h3>
                            <p>It takes seconds to record daily transactions. Put them into clear and visualized categories such as Expense: Food, Shopping or Income: Salary, Gift.</p>
                        </div>
                        <img src="https://moneylover.me/img/details/budget@4x.png" alt="" className="w-[350px] shadow-lg rounded-lg" />
                    </div>
                    <div className="flex gap-8 items-center w-3/4 mx-auto py-12">
                        <img src="https://moneylover.me/img/details/REPORT@4x.png" alt="" className="w-[350px] shadow-lg rounded-lg" />
                        <div>
                            <h3 className="text-4xl py-4">The whole picture in one place</h3>
                            <p>One report to give a clear view on your spending patterns. Understand where your money comes and goes with easy-to-read graphs.</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}