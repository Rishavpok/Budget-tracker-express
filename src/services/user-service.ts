import bcrypt from 'bcryptjs';
import User from "../Models/user-model";
import jwt from 'jsonwebtoken'
import crypto from "crypto";
import nodemailer from "nodemailer";
const JWT_SECRET = '75911006393537b222637773603aa808dcfa871cfc29a90e51427c5bb7f6c0579ce4f5fa05042a237cb0200dc95055407d9873f0a910722c8db6b2d9dbb2b188'
export class UserService {
    constructor() {
    }


    async register(username  :string , password : string, firstName  :string , lastName : string , email : string , phone : string) {
       const existingUser = await User.findOne({username})
        if(existingUser) {
            throw { status : 500 , message : 'User already exists' }
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const  newUser = new User({username, password : hashedPassword, email , firstName , lastName ,phone})
        await newUser.save()
        return newUser
    }

    async login(username : string , password : string) {
        const user = await User.findOne({username})
        if(!user) {
            throw { status : 500 , message : 'User not found' }
        }
        const isMatch = await bcrypt.compare(password , user.password)

        if(!isMatch) {
            throw { status : 400 , message : 'Password doesnot match' }
        }

       const token = jwt.sign({userId : user._id}, JWT_SECRET)

       return token

    }


    async forgetPassword(email : string) {
        const user = await User.findOne({email})
        if(!user) {
            throw {
                status : 404,
                message : "User not found"
            }
        }

        const token = crypto.randomBytes(32).toString("hex");
        const hash = crypto.createHash("sha256").update(token).digest("hex");

        user.resetPasswordToken = hash;
        user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

        await user.save()

        const resetLink = `http://localhost:3000/reset-password?token=${token}`;

        const transporter = nodemailer.createTransport({
            service  : 'gmail',
            auth : {
                user : 'rishavpokharel98@gmail.com',
                pass : 'jfap qerj dcrw dlej'
            }
        })

        await transporter.sendMail({
            from : "Express App",
            to : user.email,
            subject : 'Reset your password',
            text : resetLink
        })

        return user

    }


    async resetPassword(token : string , password : string) {

        const hash = crypto.createHash("sha256").update(token).digest("hex");

        const user = await User.findOne({
            resetPasswordToken : hash,
            resetPasswordExpires : { $gt: Date.now() },
        })

        if (!user) {
            throw {
                status : 400, message : 'Token invalid or expired'
            }
        }

        const hashedPassword = await bcrypt.hash(password,10);
        user.password = hashedPassword
        user.resetPasswordExpires = undefined
        user.resetPasswordToken = undefined

        await user.save()

        return user

    }
}

