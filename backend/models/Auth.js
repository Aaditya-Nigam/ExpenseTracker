const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    email: {
        type: String,
        unique: [true,"Email must be unique"],
        required: [true,"Email must be provided"]
    },
    password: {
        type: String,
        required: [true, "Password must be provided"]
    }
},{timestamps: true})

const User=mongoose.model("User",userSchema);
module.exports=User;