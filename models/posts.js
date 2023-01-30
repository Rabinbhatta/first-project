import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    despcrition: String,
    location: String,
    userPicturePath: String,
    picturePath: String,
    likes :{
       type: Map,
       of: Boolean
    },
    comment:{
        type:Array,
        default:[]
    }

},{timestamps:true})

const Post = mongoose.model("Post",postSchema)

export default Post