import bcrypt from 'bcryptjs';
import User from "../Models/user-model";
import jwt from 'jsonwebtoken'
const JWT_SECRET = '75911006393537b222637773603aa808dcfa871cfc29a90e51427c5bb7f6c0579ce4f5fa05042a237cb0200dc95055407d9873f0a910722c8db6b2d9dbb2b188'
export class UserService {
    constructor() {
    }


    async register(username  :string , password : string) {
       const existingUser = await User.findOne({username})
        if(existingUser) {
            throw { status : 500 , message : 'User already exists' }
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const  newUser = new User({username, password : hashedPassword})
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
}

