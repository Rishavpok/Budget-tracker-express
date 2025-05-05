import express from "express";
import {payloadValidatorMiddleware} from "../middleware/payloadValidatorMiddleware";
import {UserService} from "../services/user-service";
var router = express.Router();
import User from "../Models/user-model";

// Register new users
router.post('/register', payloadValidatorMiddleware , async (req, res) => {
   const { username , password } = req.body
   const userservice = new UserService()
    try {
        const newUser = await userservice.register(username,password)
        if(newUser) res.status(200).json({ message : "User registered successfully" })
    } catch (err)  {
        const status = err.status || 500;
        res.status(status).json({ message: err.message || "Server error" });
    }
} )

// Login

router.post('/login' , async (req , res) => {
    const { username , password } = req.body
    const userservice = new UserService()

    try {
        const token = await userservice.login(username, password)
        res.status(200).json({token : token})
    } catch (err) {
        const status = err.status || 500;
        res.status(status).json({ message: err.message || "Server error" });
    }
} )

// Get all users

router.get('/list', async (req , res) => {

    try {
        const  users = await User.find()
        res.status(200).json({ data : users })

    } catch (e) {
        console.log(e)
    }
} )


export default router




