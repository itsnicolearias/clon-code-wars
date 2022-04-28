import jwt from 'jsonwebtoken'
import config from '../config'
import Role from '../models/Role';
import User from '../models/User';

export const verifyToken = async (req, res, next) => {
 
    const token = req.headers["x-access-token"];
    console.log(token)

    if (!token) return res.status(403).json('No token provided')
 try {
   

    const decoded = jwt.verify(token, config.SECRET)
    req.userId = decoded.id
    
    const user = await User.findById(decoded.id)
    if (!user) return res.satus(404).json('No user found')

    next()
 } catch (error) {
     res.json('unauthorized')
 }
    
}

//cada user va tener un rol
//tengo que checkear si ese id esta incluido en Roles 
export const isAdmin = async (req, res, next) => {
    
    try {
        const user = await User.findById(req.userId)
        const roles = await Role.find({_id: {$in: user.roles}})
    
    for (let i = 0; i < roles.length; i++){
        if (roles[i].name === "Admin"){
            next()
             return;
        }
       
    }
    return res.json('UNAUTHORIZED. require Admin role')
    } catch (error) {
        return res.status(500).send(error)
    }
    
}