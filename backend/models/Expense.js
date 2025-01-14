const mongoose=require("mongoose");

const expenseSchema=mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Expense must have an owner"]
    },
    title:{
        type: String,
        required: [true, "Expense must have a title"]
    },
    amount:{
        type: Number,
        required: [true,"Expense must have an amount"]
    },
    category:{
        type: String,
        default: "Other"
    },
    transactionType:{
        type: String,
        required:[true, "Credit or debit must be clearly mensioned"]
    },
    date: {
        type: String,
        required: [true, "Date must be provided"]
    }
},{timestamps: true})

const Expense=mongoose.model("Expense",expenseSchema)
module.exports=Expense;