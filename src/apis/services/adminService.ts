import User from "../models/userModel"

const getUserService = async (): Promise<User[]> => {
  return await User.find()
}

const getUsersById = async (userId: string): Promise<User> => {
  return
}

export {
  getUserService
}