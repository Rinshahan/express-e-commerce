import User from "../models/userModel"
import generateToken from "../utils/jsonwebtoken"
import jwt from "jsonwebtoken"
import user from "../interfaces/userInterface"
const createUser = async (userData: user): Promise<user> => {
  return User.create(userData)
}

const authenticateUser = async (username: string, password: string): Promise<{ user: user, token: string }> => {
  const user = await User.findOne({ username }).select('+password')
  if (!user || !(await user.comparePasswordinDb(password, user.password))) {
    throw new Error("Incorrect username or password")
  }

  const token = generateToken(user.id)
  return { user, token }
}

const authenticateAdmin = async (username: string, password: string) => {
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ username, isAdmin: true, role: 'admin' }, process.env.SECRET_STR, { expiresIn: 60 * 60 * 24 })
    return token
  }
}

export {
  createUser,
  authenticateUser,
  authenticateAdmin
}