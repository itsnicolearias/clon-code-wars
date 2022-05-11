import mongoose from 'mongoose'

try {
    mongoose.connect('mongodb://localhost:27017/clon-code-wars'
    )
    console.log('DB connected')
  } catch (error) {
    console.log(error)
  }