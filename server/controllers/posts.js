import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js"
import  {v2 as cloudinary} from "cloudinary"
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
   cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
   api_key : process.env.CLOUDINARY_CLOUD_API_KEY ,
   api_secret : process.env.CLOUDINARY_CLOUD_API_SECRET
})

export const getPosts = async (req, res) => {
   const { page } = req.query
   try {
      const LIMITS = 8; // you can change that this is for pagination 
      // so the first post in 3 page should be 8+8+8 -1 because on start from 0
      const startIndex = (Number(page) - 1) * LIMITS  // get the startindex from every page
      const total = await PostMessage.countDocuments({})
      // sort post from newest to oldest 
      const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMITS).skip(startIndex)
      res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMITS) })
   } catch (error) {
      res.status(404).json({ "message": error })
   }
}

export const getPost = async (req, res) => {
   const { id } = req.params;
   try {

      const post = await PostMessage.findById(id)

      res.status(200).json(post)
   } catch (error) {
      res.status(404).json({ "message": error })
   }
}


export const createPosts = async (req, res) => {
   const post = req.body;
 
   try {
   const fileUrl = await cloudinary.uploader.upload(post.selectedFile,{folder: "memories"}); //upload the image to the cloudinary

   const newPost = new PostMessage({ ...post ,selectedFile: fileUrl.url , creator: req.userId, createdAt: new Date().toISOString() });
   
      await newPost.save();
      res.status(201).json(newPost)
   } catch (error) {
      res.status(409).json({ "message": error.message })
   }
}

export const updatePost = async (req, res) => {
   const { id } = req.params;
   const post = req.body;

   if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
   // if you want to update the selected file you need to delete it and create new One , because you can have 100 likes for example
   // then you update the selectedFile (image) (not logic) so we exclude the selectedFile from the update

   const updatedPost = await PostMessage.findByIdAndUpdate(id, { ...post, id }, { new: true });

   res.json(updatedPost);
}

export const deletePost = async (req, res) => {
   const { id } = req.params;

   if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

   await PostMessage.findByIdAndRemove(id);

   res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
   const { id } = req.params;

   // after we create auth middleware we set req.userId so if user is authenticated  that we can use this route
   if (!req.userId) return res.json({ message: "User is not Authenticated" });


   if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

   const post = await PostMessage.findById(id);

   // here we want user to be able to like once a post
   const index = post.likes.findIndex((id) => id === String(req.userId))

   if (index === -1) {
      // like 
      post.likes.push(req.userId);
   }
   else {
      //dislike
      post.likes = post.likes.filter((id) => id !== req.userId);
   }

   const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

   res.json(updatedPost);
}


export const getPostsBySearch = async (req, res) => {
   const { searchQuery, tags } = req.query
   try {
      const title = RegExp(searchQuery, 'i'); // 
      const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] });
      res.status(200).json({ data: posts })
   } catch (error) {
      res.status(404).json({ "message": error.message })
   }
}