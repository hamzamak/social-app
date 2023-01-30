import express from "express";

import { createPosts, getPosts ,updatePost,deletePost,likePost,getPostsBySearch, getPost } from "../controllers/posts.js";
import auth from "../middleware/auth.js";
const router = express.Router();
router.get('/', getPosts)
router.get('/search', getPostsBySearch)
router.get('/:id', getPost)

router.post('/',auth,createPosts)
router.patch('/:id',auth,updatePost)
router.delete('/:id',auth,deletePost)
router.patch('/:id/likePost',auth,likePost)

export default router 