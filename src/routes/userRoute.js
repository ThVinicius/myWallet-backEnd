import { Router } from 'express'
import { getWallet, postAdd } from '../controllers/userController.js'
import tokenValidate from '../middlewares/userMiddlewares/tokenValidate.js'
import postAddValidate from '../middlewares/userMiddlewares/postAddValidate.js'

const router = Router()

router.get('/wallet', tokenValidate, getWallet)
router.post('/add', postAddValidate, tokenValidate, postAdd)

export default router
