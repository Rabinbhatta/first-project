import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min:2,
    max:40
  },
  lastName: {
    type: String,
    required: true,
    min:2,
    max:40
  },
  email: {
    type: String,
    required: true,
    min:2,
    max:40
  },
  password: {
    type: String,
    required: true,
    min:8,
  },
  picturePath: {
    type: String,
   default:""
  },
  friends: {
    type: Array,
   default:[]
  },
  occupation: String,
  location: String,
   profileViewed: Number,
   impression : Number
},
{timestamps: true}
)

export const User = mongoose.model("User",UserSchema)