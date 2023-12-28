import User from "../models/userModel"
import generateToken from "../utils/jsonwebtoken"

const createUser = async (userData: User): Promise<User> => {
  return User.create(userData)
}

const authenticateUser = async (username: string, password: string): Promise<{ user: User, token: string }> => {
  const user = await User.findOne({ username }).select('+password')
  if (!user || !(await user.comparePasswordinDb(password, user.password))) {
    throw new Error("Incorrect username or password")
  }

  const token = generateToken(user.email)
  return { user, token }
}

export {
  createUser,
  authenticateUser
}