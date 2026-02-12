import mongoose from "mongoose"

const passwordSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const Password = mongoose.model("Password", passwordSchema, "passwords")

export default Password