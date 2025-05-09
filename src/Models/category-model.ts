import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name : {
        type :String
    }
})

const category = mongoose.model('Category', CategorySchema)

export default category