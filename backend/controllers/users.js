import express from "express"
const app = express()
app.use(express.json())
import User from "../models/User.js"

export const signUp = async (req, res) => {
try {
    const { username, password, email } = req.body
    if(!username || !password || !email) {
        res.send("didnt work")
    }

    const savedUser = await User.create({
        username,
        password,
        email,
    })

    res.status(201).json({savedUser})

} catch (error) {
    console.error(error)
    res.status(500).send("Server Error")
}
}