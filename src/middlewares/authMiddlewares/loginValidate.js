import loginSchema from '../../schemas/loginSchema.js'
import { db } from '../../db/mongo.js'
import bcrypt from 'bcrypt'

export default async function loginValidate(req, res, next) {
  const { error } = loginSchema.validate(req.body)

  if (error) return res.sendStatus(400)

  try {
    const { email, password } = req.body

    const user = await db.collection('users').findOne({ email })

    const compare = bcrypt.compareSync(password, user.password)

    if (!compare && user) return res.sendStatus(401)

    res.locals.user = user

    next()
  } catch (error) {
    return res.status(500).send(error)
  }
}
