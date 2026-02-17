import express from "express"
import bcrypt from "bcrypt"
import path from "path"
import 'dotenv/config'
const app = express()
import { connectDB } from "./config/db.js"
const root = path.resolve(import.meta.dirname, "..")
import { addPassword, deletePassword, getAllPasswords, getSpecificPassword, updatePassword } from "./controllers/passwords.js"
import { signIn, signUp } from "./controllers/users.js"
import authenticateToken from "./middleware/authenticateUser.js"
connectDB()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(root, "frontend")))
app.use(authenticateToken)


const PORT = process.env.PORT || 5500
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})

// Unprotected Routes
app.post("/signup", signUp)
app.post("/signin", signIn)
app.get("/", getAllPasswords)

// Protected Routes
app.get("/mypasswords/:id", getSpecificPassword)
app.post("/mypasswords/addPassword", addPassword)
app.put("/mypasswords/:id", updatePassword)
app.delete("/mypasswords/:id", deletePassword)

