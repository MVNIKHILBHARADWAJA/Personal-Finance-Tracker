import jwt from "jsonwebtoken";
import ExpressError from "../utils/ExpressError.js";
import wrapAsync from "../utils/WrapAsync.js";
import Transaction from "../models/Transaction.js";
 const secretKey="12345"
export const authenticationMiddleware=wrapAsync(async(req,res,next)=>{
    
 const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ExpressError(401, "You have to be logged in first"));
  }
  
  const token = authHeader.split(' ')[1];
  const user=jwt.verify(token,secretKey);
  req.user=user;
next();
   


});

export const authorizationMiddleware=wrapAsync(async(req,res,next)=>{
  let {id}=req.params;
  
  
  const transaction = await Transaction.findById(id);

  if (!transaction) {
    return next(new ExpressError(404, "Transaction not found"));
  }

  if (transaction.user.toString() !== req.user.id) {
    return next(new ExpressError(403, "You are not authorized for this action"));
  }


next();
})