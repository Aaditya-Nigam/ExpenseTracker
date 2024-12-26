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
    try{
        const {id}=req.params;
        const expense=await Expense.findById(id);
        if(expense==null){
            res.status(404).json({error: "No expense found!"});
            return ;
        }
        if(expense.userId != req.user.id){
            res.status(401).json({error: "User unauthenticated!"});
            return ;
        }
        res.status(202).send(expense);
    }catch(err){
        console.log(err);
        res.status(404).json({error: "No expense found"});
    }
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
    try{
        if(!req.body || !req.body.title || !req.body.amount || !req.body.category || !req.body.transactionType){
            res.status(404).json({error: "Fields are missing!"});
            return ;
        }
        const {id}=req.params;
        const expense=await Expense.findById(id);
        if(expense==null){
            res.status(404).json({error: "Expense not found!"});
            return ;
        }
        if(expense.userId != req.user.id){
            res.status(402).json({error: "User unauthenticated!"});
            return ;
        }
        const newExpense={
            title: req.body.title,
            amount: req.body.amount,
            category: req.body.category,
            transactionType: req.body.transactionType
        }
        const updatedExpense=await Expense.findByIdAndUpdate(id,newExpense);
        if(updatedExpense==null){
            res.status(402).json({error: "User unauthenticated!"});
            return ;
        }
        res.status(202).send(updatedExpense);
    }catch(err){
        res.status(402).json({error: "User unauthenticated!"});
    }
})


router.delete("/:id",verification,async (req,res)=>{
    try{
        const {id}=req.params
        const expense=await Expense.findById(id);
        if(expense==null){
            res.status(404).json({error: "No expense found!"});
            return ;
        }
        if(expense.userId != req.user.id){
            res.status(402).json({error: "User unauthenticated!"});
            return ;
        }
        const deletedExpense=await Expense.findByIdAndDelete(id);
        if(deletedExpense==null){
            res.status(404).json({error: "Expense not found!"});
            return ;
        }
        res.status(202).send(deletedExpense);
    }catch(err){
        res.status(404).json({error: "User unauthenticated!"});
    }
})


module.exports=router