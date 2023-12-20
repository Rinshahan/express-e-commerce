import jwt from "jsonwebtoken"

const generateToken = ((email) => {
  return jwt.sign({ email }, `${process.env.SECRET_STR}`, { expiresIn: 60 * 60 * 24 })
})


export default generateToken