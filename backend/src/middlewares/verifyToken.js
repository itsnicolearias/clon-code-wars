import jwt from 'jsonwebtoken'
import env from 'dotenv'
import User from '../models/User';

export const verifyToken = async (req, res, next) => {
    const token = req.headers["x-access-token"];
    console.log(token)

    if (!token) return res.status(403).json('No token provided')

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
    const user = await User.findById(decoded.id)
    if (!user) return res.satus(404).json('No user found')

    next()
}