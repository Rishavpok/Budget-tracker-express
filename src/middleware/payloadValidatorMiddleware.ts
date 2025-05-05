import { Request, Response , NextFunction } from "express";

export function payloadValidatorMiddleware(req : Request , res : Response , next : NextFunction) {
    if(req.method == 'POST') {
        const { username , password } = req.body
        if(!username || !password) {
             res.status(400).json({message : "Username and password are required"})
            return
        }
    }
    return  next()
}