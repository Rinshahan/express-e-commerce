import jwt from "jsonwebtoken"

const generateToken = ((id) => {
  return jwt.sign({ id, isAdmin: false, role: 'user' }, `${process.env.SECRET_STR}`, { expiresIn: 60 * 60 * 24 })
})


export default generateToken