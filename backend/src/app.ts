import express from 'express'
import morgan from 'morgan'
import katasRoutes from './routes/katas.routes'
import authRoutes from './routes/auth.routes'
import { createRoles, createAdmin } from './libs/initialSetup'

import userRoutes from './routes/user.routes'
import cors from 'cors'
import helmet from 'helmet'


//config
const app = express()
createRoles()
createAdmin()




//middleware
const corsOptions = {
     origin: "http://localhost:4000",
  };
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res)=> {
    res.json('welcome')
})



app.use('/api/katas', katasRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

export default app;