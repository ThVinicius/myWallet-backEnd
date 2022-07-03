import { Router } from 'express'
import {
  getWallet,
  postAdd,
  deleteRecord
} from '../controllers/userController.js'
import tokenValidate from '../middlewares/userMiddlewares/tokenValidate.js'
import postAddValidate from '../middlewares/userMiddlewares/postAddValidate.js'
import idParamsValidate from '../middlewares/userMiddlewares/idParamsValidate.js'

const router = Router()

router.get('/wallet', tokenValidate, getWallet)
router.post('/add', postAddValidate, tokenValidate, postAdd)
router.delete('/delete/:id', idParamsValidate, tokenValidate, deleteRecord)

export default router
