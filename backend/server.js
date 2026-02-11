import express from "express"
import path from "path"
import 'dotenv/config'
const app = express()
import { connectDB } from "./config/db.js"
const root = path.resolve(import.meta.dirname, "..")
import { addPassword, deletePassword, getAllPasswords, updatePassword } from "./controllers/passwords.js"


connectDB()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(root, "frontend")))


const PORT = process.env.PORT || 5500
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})

app.get("/", getAllPasswords)
app.post("/addPassword", addPassword)
app.put("/:id", updatePassword)
app.delete("/:id", deletePassword)
