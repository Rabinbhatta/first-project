import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getPosts, getUserPosts, likePost } from "../controllers/posts.js";
const router = express.Router()
/*read*/
router.get("/",verifyToken, getPosts)
router.get("/:userId/post",verifyToken, getUserPosts)

/*update*/
router.patch("/:id/liked", verifyToken,likePost )

export default router
