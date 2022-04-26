import Role from '../models/Role'

export const createRole = async () => {
    
    try {
     const count = await Role.estimatedDocumentCount()   
     if (count > 0) return;

     const values = await Promise.all([
         new Role({ name: "Admin"}).save(),
         new Role({ name: "User"}).save() 
     ])
     console.log(values)
    } catch (error) {
        console.error(error)
    }
}