import { Router } from 'express'
import loginValidate from '../middlewares/authMiddlewares/loginValidate.js'
import registerValidate from '../middlewares/authMiddlewares/registerValidate.js'
import { login, register } from '../controllers/authController.js'

const router = Router()

router.post('/login', loginValidate, login)
router.post('/register', registerValidate, register)

export default router
