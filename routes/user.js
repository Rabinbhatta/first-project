import  express  from "express";
import {verifyToken} from "../middleware/auth.js"
import {getUser,getUserFriend,addRemoveFriend} from "../controllers/user.js"


const router = express.Router();

/*read*/
router.get("/:id",verifyToken, getUser);
router.get("/:id/friends",verifyToken, getUserFriend);

/*patch*/
router.patch("/:id/:friendId",verifyToken, addRemoveFriend);

export default router