import { Schema, model} from 'mongoose'

//TODO rating

export const KataLevel = {
    BASIC: 'Basic',
    MEDIUM: 'Medium',
    HIGH: 'High'
}


const kataSchema = new Schema({
    
        name: { 
            type: String, required: true
        }, 
        description: {
             type: String, required: true 
        }, 
        level: {
             type: String, required: true 
        }, 
        intents: {
             type: Number, required: true
        },
        stars: {
             type: Number, required: true
        },
        creator: [{
            ref: 'Users',
            type: Schema.Types.ObjectId

        }],
       
        solution: {
             type: String, required: true
        },
        participants: {
             type: [], required: true
        }
      
})

export default model('Kata', kataSchema)