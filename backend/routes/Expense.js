const express=require("express")
const router=express.Router();
const jwt=require("jsonwebtoken")
const Expense=require("../models/Expense")

const verification=(req,res,next)=>{
    if(!req.cookies?.token){
        res.status(402).json({error: "User unauthenticated!"});
        return ;
    }
    jwt.verify(req.cookies.token,process.env.JWT,(err,user)=>{
        if(err){
            res.status(402).json({error: "Invalid token"});
            return ;
        }
        req.user=user;
        next();
    })
}


router.get("/",verification,async (req,res)=>{
    try{
        if(!req.user?.id){
            res.status(404).json({error: "User unauthenticated!"});
            return ;
        }
        const allExpenses=await Expense.find({userId: req.user.id});
        res.status(202).send(allExpenses);
    }catch(err){
        res.status(404).json({error: "User unauthenticated!"});
        console.log(err);
    }
})


router.get("/:id",verification,async (req,res)=>{
    const {id}=req.params
    res.send(`get for the id: ${id}`)
})


router.post("/",verification,async (req,res)=>{
    try{
        if(!req.body || !req.body.title || !req.body.amount || !req.body.transactionType){
            res.status(404).json({error: "Fields are missing!"});
            return ;
        }
        let expense={
            userId: req.user.id,
            title: req.body.title,
            amount: req.body.amount,
            transactionType: req.body.transactionType
        }
        if(req.body.category){
            expense={...expense,category: req.body.category}
        }
        const addedExpense=await Expense.create(expense);
        if(addedExpense==null){
            res.status(401).json({error: "Expense not added1"});
            return ;
        }
        res.status(201).send(addedExpense);
    }catch(err){
        res.status(402).json({error: "Fields are missing"});
        // console.log(err);
    }
})


router.patch("/:id",verification,async (req,res)=>{
    res.send(`update for the id: ${id}`)
})


router.delete("/:id",verification,async (req,res)=>{
    res.send(`delete for the id: ${id}`)
})


module.exports=router