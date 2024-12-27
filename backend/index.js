const express=require("express");
const dotenv=require("dotenv");
const mongoose=require("mongoose");
const cors=require("cors")
const AuthRoute=require("./routes/Auth")
const ExpenseRoute=require("./routes/Expense");
const cookieParser = require("cookie-parser");

dotenv.config();

const app=express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use("/api/user/",AuthRoute)
app.use("/api/expense",ExpenseRoute)

mongoose.connect(process.env.URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Listening at port no. ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log(err);
})