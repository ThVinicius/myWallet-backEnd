import express, { json } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { login, register } from './controllers/authController.js'
import { getWallet } from './controllers/userController.js'

const app = express()

app.use(cors())
app.use(json())
dotenv.config()

app.post('/login', login)
app.post('/register', register)

app.get('/wallet', getWallet)

app.listen(5000)
