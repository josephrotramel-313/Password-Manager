import Password from "../models/Password.js"
import jwt from "jsonwebtoken"
import path from "path"
const root = path.resolve(import.meta.dirname, "..")

export const getAllPasswords = async(req, res) => {
  const token = req.headers.authorization.split(" ")[1]
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  res.json(decoded)
}

export const addPassword = async (req, res) => {
  
  try {
    const { title, username, password } = req.body     

    if (!title || !username || !password) {
      return
    }

    const savedPassword = await Password.create({
      title,
      username,
      password,
      user: req.user.userId
    })

    res.status(201).json(savedPassword)


  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

export const updatePassword = (req,res) => {
    res.send(`password: ${req.params.id} Updated successfully`)
}

export const deletePassword = (req,res) => {
    res.send(`password: ${req.params.id} Deleted successfully`)
}

export const getSpecificPassword = (req,res) => {
    res.send(`password: ${req.params.id}`)
}

export const home = (req,res) => {
  res.sendFile(path.join(root, "frontend", "index.html"))
}