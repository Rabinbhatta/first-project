import { User } from "../models/user.js";
import Post from "../models/posts.js";

export const createPost = async (req,res) =>{
  try {
    const {userId,description,picturePath} = req.body
    const user = User.findById(userId)
    const newpost = Post({
        userId,
        firstName:user.firstName,
        lastName:user.lastName,
        description,
        location:user.location,
        picturePath,
        userPicturePath:user.picturePath,
        likes:{},
        comment:[]
    })
    newpost.save()
    const posts = await Post.find()
    res.status(200).json({posts})
  } catch (err) {
    res.status(404).json({message:err.message})
  }
}

export const getPosts = async (req,res) =>{
    try {
      const posts = await Post.find()
      res.status(200).json({posts})
    } catch (err) {
      res.status(404).json({message:err.message})
    }
  }

  export const getUserPosts = async (req,res) =>{
    try {
      const {userId} = req.params
      const post = await Post.find({userId})
      res.status(200).json({post})
    } catch (err) {
      res.status(404).json({message:err.message})
    }
  }

  export const likePost = async (req,res) =>{
    try {
      const {id} = req.params
      const {userId} = req.body
      const post = Post.findById(id)
      const liked = post.get(userId)
      if(liked){
        post.likes.delete(userId)
      }else{
        post.likes.set(userId,true)
      }

      const updatePost = Post.findByIdAndUpdate(
        id,
        {likes:post.likes},
        {new :true})
      res.status(200).json()
    } catch (err) {
      res.status(404).json({message:err.message})
    }
  }