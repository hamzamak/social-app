
import User from "../models/user.js"
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

export const SignIn = async (req, res) => {
   const { email, password } = req.body;
   try {
      const existingUser = await User.findOne({ email });
      if (!existingUser) return res.status(404).json({ message: "User not found" });

      const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
      if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credential !" });

      const token = jwt.sign({
         email: existingUser.email, id: existingUser._id
      },
         "testSecret",
         {
            expiresIn: '1h'
         })
      res.status(200).json({ result: existingUser, token });

   } catch (error) {
      res.status(500).json({ "message": error })
   }
}


export const SignUp = async (req, res) => {
   const { firstName, lastName, email, password, confirmPassword } = req.body;


   try {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: "User already exists" });

      if (password !== confirmPassword) return res.status(400).json({ message: " password don't match" });

      const hashedPassword = await bcrypt.hash(password, 12)

      const result = await User.create(
         { email, password: hashedPassword, name: `${firstName} ${lastName}` }
      )
    
      const token = jwt.sign({
         email: result.email, id: result._id
      },
         "testSecret",
         {
            expiresIn: '1h'
         })
      res.status(200).json({ result , token });

   } catch (error) {
      res.status(500).json({ "message": error.message })
   }
}




