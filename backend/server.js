import express from "express";
import mongoose from "mongoose";
import transactionRoutes from "./routes/transactionroutes.js";
import userRoutes from "./routes/userroutes.js";

import globalerrorhandler from "./middlewares/globalerrormiddleware.js";
import ExpressError from "./utils/ExpressError.js";
import cors from "cors";
const app=express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/",transactionRoutes);
app.use("/",userRoutes)
async function main()
{
    await mongoose.connect("mongodb+srv://mvnikhilbharadwaja_db_user:MaBxZbitJx2mwgqm@cluster0.c3wotqe.mongodb.net/finance-tracker?retryWrites=true&w=majority&appName=Cluster0");
}
main().then(()=>{
    console.log("MongoDB connection succesful")
})
.catch((err)=>{
    console.log(err);
});
app.use((req,res,next)=>{
    return next(new ExpressError(404,"No Page Found"));
});
app.use(globalerrorhandler);
app.listen(8080,()=>{
    console.log("server is listening at port 8080");
});