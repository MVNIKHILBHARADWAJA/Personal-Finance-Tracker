const globalerrorhandler=(err,req,res,next)=>{
    const statusCode=err.statusCode||404;
    const message=err.message||"something went wrong";

    return res.status(statusCode).json({message});
}

export default globalerrorhandler;