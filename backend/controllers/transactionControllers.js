import Transaction from "../models/Transaction.js"
import ExpressError from "../utils/ExpressError.js";
import wrapAsync from "../utils/WrapAsync.js";

export const allTransactions=wrapAsync(async(req,res)=>{
   const Transactions=await Transaction.find({user:req.user.id});
   return res.status(200).json({data:Transactions});

});

export const respectiveTransaction=wrapAsync(async(req,res,next)=>{
   let {id}=req.params;
   let transaction=await Transaction.findOne({_id:id,user:req.user.id});
   if(!transaction)
   {
      return next(new ExpressError(404,"transaction not found"));
   }
   return res.status(200).json({data:transaction});

})

export const addTransaction=wrapAsync(async(req,res,next)=>{

   const newTransaction=new Transaction({...req.body,user:req.user.id});
 await newTransaction.save();
   return res.status(201).json({message:"New transaction created succesfully",data:newTransaction});
})

export const UpdateTransaction=wrapAsync(async(req,res,next)=>{
   let {id}=req.params;
   
      
  const updatedTransaction = await Transaction.findOneAndUpdate(
  { _id: id, user: req.user.id },
  req.body,
  { new: true, runValidators: true }
);

if (!updatedTransaction) {
  return next(new ExpressError(404, "Transaction not found"));
}

  

  return res.status(200).json({message:"updated Transaction",data:updatedTransaction})
})

export const DeleteTransaction = wrapAsync(async (req, res, next) => {
  let { id } = req.params;

  const deletedTransaction = await Transaction.findOneAndDelete({
    _id: id,
    user: req.user.id,
  });

  

  return res.status(200).json({ message: "Deleted transaction", data: deletedTransaction });
});

