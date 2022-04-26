import express from 'express'
import morgan from 'morgan'
import katasRoutes from './routes/katas.routes'
import authRoutes from './routes/auth.routes'
import { createRole } from './libs/initialSetup'

const app = express()
createRole()


app.use(morgan('dev'))
app.use(express.json())

app.get('/', (req, res)=> {
    res.json('welcome')
})



app.use('/api/katas', katasRoutes)
app.use('/api/auth', authRoutes)

export default app;