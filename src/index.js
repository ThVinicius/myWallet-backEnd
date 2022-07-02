import express, { json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoute from './routes/authRoute.js'
import userRoute from './routes/userRoute.js'

const app = express()
dotenv.config()

app.use(json())
app.use(cors())

app.use(authRoute)

app.use(userRoute)

app.listen(process.env.PORT)
