import { useEffect, useState } from "react";
import { DebitChart } from "../components/UI/DebitChart"
import { CreditChart } from "../components/UI/CreditChart";

export const Analysis=()=>{

    const [data,setData]=useState(null);
    const [credit,setCredit]=useState([]);
    const [debit,setDebit]=useState([]);

    const segregateData=()=>{
        const c=[0,0,0,0,0,0,0,0,0,0,0,0];
        const d=[0,0,0,0,0,0,0,0,0,0,0,0];
        data?data.map((ele)=>{
            // console.log(ele.createdAt.split("-")[0]);
            if(ele.createdAt.split("-")[0]=='2025'){
                if(ele.transactionType=='Credit'){
                    c[(ele.createdAt.split("-")[1]-'00')-1]+=ele.amount;
                }else{
                    d[(ele.createdAt.split("-")[1]-'00')-1]+=ele.amount;
                }
            }
        }):"";
        console.log(c)
        console.log(d)
        setCredit(c)
        setDebit(d)
    }

    const fetchData=async ()=>{
        const response=await fetch("http://localhost:5000/api/expense",{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        })
        const result=await response.json();
        if(!response.ok){
            console.log(result.error);
        }else{
            setData(result);
            console.log(result);
        }
    }

    useEffect(()=>{
        fetchData();
    },[])

    useEffect(()=>{
        segregateData();
    },[data])


    return (
        <main className="border-2 w-screen min-h-[600px]">
            <div className="w-3/4 mx-auto p-4 ">
                <h1 className="text-3xl text-center pt-2 pb-6">Analysis</h1>
                <div className="grid grid-cols-[1fr_1fr]">
                    <DebitChart lst={debit}/>
                    <CreditChart lst={credit}/>
                </div>
            </div>
        </main>
    )
}