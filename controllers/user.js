import { User}  from "../models/user.js";

export const getUser = async(req,res)=>{
    try {
        const {id} = req.params;
        const user = User.findById(id)
        res.status(200).json({user})
    } catch (err) {
        res.status(404).json({message: err.message})
    }
} 

export const getUserFriend = async(req,res)=>{
    try {
        const {id} = req.params;
        const user = User.findById(id);
        const friends = await Promise.all(
            user.friends.map((id)=>User.findById(id))
        )
        const fromattedFriends = friends.map(
            ({_id,fristName,lastName,occupation,location,picturePath})=> 
            {return{_id,fristName,lastName,occupation,location,picturePath}} )
        res.status(200).json({fromattedFriends})
    } catch (err) {
        res.status(404).json({message: err.message})
    }
}

export const addRemoveFriend = async (req,res)=>{
  try {
    const {id,friendId} = req.params;
    const user = User.findById(id);
    const friend = User.findById(friendId);
    if (user.friends.include(friendId)){
        user.friends = user.friends.fliter((id)=>{id !== friendId})
        friend.friends = friend.friends.fliter((id)=>{id !== id})
    }else{
        user.friends.push(friendId)
        friend.friends.push(id)
    }
    await user.save()
    await friend.save()
    const friends = await Promise.all(
        user.friends.map((id)=>User.findById(id))
    )
    const fromattedFriends = friends.map(
        ({_id,fristName,lastName,occupation,location,picturePath})=> 
        {return{_id,fristName,lastName,occupation,location,picturePath}} )
    res.status(200).json({fromattedFriends})

  } catch (err) {
    
  }
}