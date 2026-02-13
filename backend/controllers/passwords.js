import Password from "../models/Password.js"

export const getAllPasswords = async(req, res) => {
    res.sendFile(path.join(root, "frontend", "index.html"))
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