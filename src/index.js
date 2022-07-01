import express, { json } from 'express'
import cors from 'cors'
import authRoute from './routes/authRoute.js'
import userRoute from './routes/userRoute.js'

const app = express()

app.use(cors())
app.use(json())

app.use(authRoute)

app.use(userRoute)

app.listen(5000)
