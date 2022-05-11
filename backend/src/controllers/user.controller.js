import User from "../models/User"
import Role from "../models/Role";
import bcrypt from 'bcryptjs'




export const createUser = async (req, res) => {
   
    try {
       
        const name = req.body.name;
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const roles = req?.body?.roles || "User";
    
    
        const rolesFound = await Role.find({ name: { $in: roles } });
    
        // creating a new User
        const user = new User({
          name,
          username,
          email,
          password,
          roles: rolesFound.map((role) => role._id),
        });
        //hash password
          const saltos = await bcrypt.genSalt(10);
          const password2 = await bcrypt.hash(req.body.password, saltos);
        
        user.password = password2;
       
        // saving the new user
        const savedUser = await user.save();
    
        return res.status(200).json(savedUser);
      } catch (error) {
        console.error(error);
      }
    };
    

export const getAllUsers = async (req, res) => {
   const users = await User.find()
    res.json(users)
    
}
export const  getUserById = async (req, res) => {
    const user = await User.findById(req.params.userId)
    res.json(user)
    
}
export const updateUserById = async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, {
       new: true  
    })
   res.json(updatedUser)
    
}
export const deleteUserById = async (req, res) => {
    await User.findByIdAndDelete(req.params.userId)
    res.status(204).json('user deleted')
}