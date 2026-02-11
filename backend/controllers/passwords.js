export const getAllPasswords = (req, res) => {
    res.sendFile(path.join(root, "frontend", "index.html"))
}

export const addPassword = (req, res) => {
    const { title, username, password } = req.body

    res.json({
    title,
    username,
    password,
  })}

export const updatePassword = (req,res) => {
    res.send(`password: ${req.params.id} Updated successfully`)
}

export const deletePassword = (req,res) => {
    res.send(`password: ${req.params.id} Deleted successfully`)
}