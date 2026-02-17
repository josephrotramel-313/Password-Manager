import express from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const app = express()
app.use(express.json())
import User from "../models/User.js"

export const signUp = async (req, res) => {
try {
    const { username, password, email } = req.body
    if(!username || !password || !email) {
        res.status(500).send("Server Error")
    }

    const hashedPassword = await bcrypt.hash(password, 10)


    const savedUser = await User.create({
        username,
        password: hashedPassword,
        email,
    })
    res.status(201).json({savedUser})

} catch (error) {
    console.error(error)
    res.status(500).send("Server Error")
}
}



export const signIn = async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await User.findOne({ username })

    if (!user) {
      return res.status(400).json({ message: "Incorrect username or password" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect username or password" })
    }
    const token = jwt.sign(
     { userId: user._id },       
     process.env.JWT_SECRET,     
     { expiresIn: "1h" }  
    )
    const email = user.email



    res.status(200).json({ token, username, password, email })

  } catch (err) {
    res.status(500).json({ error: "Signin failed" })
  }
}