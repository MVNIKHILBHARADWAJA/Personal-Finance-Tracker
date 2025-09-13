import mongoose, { Types } from "mongoose";

const TransactionSchema=mongoose.Schema({
    title:
    {
        type:String,
        required:true,
        trim:true
    },
    amount:{
        type:Number,
        required:true
    },
   date:{
   type:Date,
   default:Date.now
   },
   category:{
    type:String,
    enum:["income","expense"],
    required:true
   },
   notes:{
    type:String,
     trim:true
   },
   user:{
  type:mongoose.Schema.Types.ObjectId,
   ref:"User",
   required:true
   }

   
});

const Transaction=mongoose.model("Transaction",TransactionSchema);
export default Transaction;