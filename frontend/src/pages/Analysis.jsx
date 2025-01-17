import { useEffect, useState } from "react";
import { DebitChart } from "../components/UI/DebitChart"
import { CreditChart } from "../components/UI/CreditChart";
import { DebitPieChart } from "../components/UI/DebitPieChart";
import { CreditPieChart } from "../components/UI/CreditPieChart";

export const Analysis=()=>{

    const [data,setData]=useState(null);
    const [credit,setCredit]=useState([]);
    const [debit,setDebit]=useState([]);
    const [debitCatagory,setDebitCategory]=useState([]);
    const [creditCategory,setCreditCategory]=useState([]);

    const segregateData=()=>{
        const cre=[0,0,0,0,0,0,0,0,0,0,0,0];
        const deb=[0,0,0,0,0,0,0,0,0,0,0,0];
        const debCat=[0,0,0,0,0];
        const creCat=[0,0,0,0,0];
        data?data.map((ele)=>{
            // console.log(ele.createdAt.split("-")[0]);
            if(ele.date.split("-")[0]=='2025'){
                if(ele.transactionType=='Credit'){
                    cre[(ele.date.split("-")[1]-'00')-1]+=ele.amount;
                    switch(ele.category){
                        case "Food":
                            creCat[0]+=ele.amount;
                            break;
                        case "Rent":
                            creCat[1]+=ele.amount;
                            break;
                        case "Travel":
                            creCat[2]+=ele.amount;
                            break;
                        case "Cloth":
                            creCat[3]+=ele.amount;
                            break;
                        case "Other":
                            creCat[4]+=ele.amount;
                            break;
                        
                    }
                }else{
                    deb[(ele.date.split("-")[1]-'00')-1]+=ele.amount;
                    switch(ele.category){
                        case "Food":
                            debCat[0]+=ele.amount;
                            break;
                        case "Rent":
                            debCat[1]+=ele.amount;
                            break;
                        case "Travel":
                            debCat[2]+=ele.amount;
                            break;
                        case "Cloth":
                            debCat[3]+=ele.amount;
                            break;
                        case "Other":
                            debCat[4]+=ele.amount;
                            break;
                        
                    }
                }
            }
        }):"";
        console.log(cre)
        console.log(deb)
        setCredit(cre)
        setDebit(deb)
        setDebitCategory(debCat);
        setCreditCategory(creCat);
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
            <div className="w-3/4 mx-auto p-4">
                <h1 className="text-3xl text-center pt-2 pb-6">Analysis</h1>
                <div className="grid grid-cols-[1fr_1fr] mb-16">
                    <DebitChart lst={debit}/>
                    <CreditChart lst={credit}/>
                </div>
                <div className="grid grid-cols-[1fr_1fr] mb-16">
                    <DebitPieChart lst={debitCatagory}/>
                    <CreditPieChart lst={creditCategory}/>
                </div>
            </div>
        </main>
    )
}