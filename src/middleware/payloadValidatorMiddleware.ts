import { Request, Response , NextFunction } from "express";

export function payloadValidatorMiddleware(req : Request , res : Response , next : NextFunction) {
    if(req.method == 'POST') {
        const { username , password , firstName, lastName , email , phone} = req.body
        if(!username || !password || !firstName || !lastName || !email || !phone) {
             res.status(400).json({message : "Please provide all required data !!!!"})
            return
        }
    }
    return  next()
}