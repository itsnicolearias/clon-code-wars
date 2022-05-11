import { Schema, model } from 'mongoose'

//TODO relacionar katas con user


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    katas: [{
        ref: 'Katas',
        type: Schema.Types.ObjectId
    }],
    
    roles: [{
        ref: 'Role',
        type: Schema.Types.ObjectId
    }]
})




export default model('User', userSchema)

//esto es un arreglo de objetos en el cual cada objeto va a tener una relacion