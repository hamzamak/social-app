import express from "express";
import cors from 'cors'
import mongoose from "mongoose";
import bodyParser from "body-parser";
import morgan from "morgan";
import postsRoutes from './routes/posts.js'
import usersRoutes from './routes/users.js'
import dotenv from "dotenv";
const app = express();
dotenv.config();

app.use(bodyParser.json({limit : "30mb" ,extended : true}))
app.use(bodyParser.urlencoded({limit : "30mb" ,extended : true}))
app.use(cors())
app.use(morgan('tiny'))
//*************************************** */ 

app.use('/posts',postsRoutes);
app.use('/users',usersRoutes);

//*************************************** */
// mongodb connect
const MONGOOSE_URL = process.env.MONGOOSE_URL

const PORT = process.env.PORT || 5000 ;


mongoose.connect(MONGOOSE_URL , {useNewUrlParser : true , useUnifiedTopology : true})
.then(()=> app.listen(PORT, ()=> console.log(`Server Running from port ${PORT}`)))
.catch((err)=> console.log(err.message) )
