import { Schema, model} from 'mongoose'

const kataSchema = new Schema({
    name: String,
    description: String,
    solution: String
})

export default model('Kata', kataSchema)