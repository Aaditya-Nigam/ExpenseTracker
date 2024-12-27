const express=require("express");
const router=express.Router();
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const User=require("../models/Auth")

router.post("/register",async (req,res)=>{
    try{
        if(!req.body || !req.body.email || !req.body.password){
            res.status(404).json({error: "Fields are missing!"});
            return ;
        }
        const isPresent=await User.exists({email:req.body.email});
        if(isPresent){
            res.status(404).json({error: "User already exists"});
            return ;
        }
        const salt=bcrypt.genSaltSync(10);
        const hash=bcrypt.hashSync(req.body.password,salt);
        const user={
            email: req.body.email,
            password: hash
        }
        const createdUser=await User.create(user)
        if(createdUser==null){
            res.status(404).status("Invalid credentials!")
            return ;
        }
        res.status(201).send(createdUser);
    }catch(err){
        console.log(err);
        res.status(404).json(err)
    }
})

router.post("/login",async (req,res)=>{
    try{
        if(!req.body || !req.body.email || !req.body.password){
            res.status(404).json({error: "Fields are missing!"});
            return ;
        }
        const user=await User.findOne({email:req.body.email});
        if(user==null){
            res.status(404).json({error: "Invalid credentials!"});
            return ;
        }
        const checkPassword=bcrypt.compareSync(req.body.password,user.password);
        if(!checkPassword){
            res.status(404).json({error: "Invalid credentials"});
            return ;
        }
        const token=jwt.sign({id:user._id},process.env.JWT);
        console.log(token);
        res.status(200).cookie("token",token,{
            httpOnly: true,
            secure: process.env.NODE_ENV==='production'
        }).send(user)
    }catch(err){
        res.status(404).json({error: err})
        console.log(err)
    }
})

router.post("/logout",(req,res)=>{
    try{
        res.status(201).clearCookie("token",{
            httpOnly: true,
            secure: process.env.NODE_ENV==='production'
        }).send("User logged out!")
    }catch(err){
        console.log(err);
    }
})

module.exports=router