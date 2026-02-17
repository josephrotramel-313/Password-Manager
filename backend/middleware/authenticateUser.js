import jwt from "jsonwebtoken"
const unprotectedRoutes = ["/signin", "/signup", "/"]


export default function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization
  
  if(unprotectedRoutes.includes(req.url)){
    return next()
  }

  if (!authHeader) {
    return res.status(401).json({ message: "Access denied, No authorization token" })
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = decoded
    next()

  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" })
  }
}
