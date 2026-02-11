import Password from "../models/Password.js"

export const getAllPasswords = async(req, res) => {
    res.sendFile(path.join(root, "frontend", "index.html"))
}

export const addPassword = (req, res) => {
    try {
        const { title, username, password } = req.body     
    if(!title || !username || !password) {
        return res.status(400).json({ message: "all Fields required"})
    }

    const savedPassword =  Password.create({
      title,
      username,
      password,
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