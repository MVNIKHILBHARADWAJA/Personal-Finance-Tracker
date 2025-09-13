import jwt from "jsonwebtoken";

 const secretKey="12345";
export const tokenGeneration=(userPayload)=>{
    return jwt.sign(userPayload,secretKey);
}
export const verifyToken=(token)=>{
    return jwt.verify(token,secretKey);
}
