import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    }
})

export const Todo = mongoose.model('Todo' , todoSchema)