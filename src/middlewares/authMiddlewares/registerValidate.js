import { db } from '../../db/mongo.js'
import userSchema from '../../schemas/registerSchema.js'

export default async function registerValidate(req, res, next) {
  const { error } = userSchema.validate(req.body)

  if (error) return res.sendStatus(400)

  try {
    const { email } = req.body

    const search = await db.collection('users').findOne({ email })

    if (search !== null) return res.sendStatus(409)
  } catch (error) {
    return res.status(500).send(error)
  }

  next()
}
