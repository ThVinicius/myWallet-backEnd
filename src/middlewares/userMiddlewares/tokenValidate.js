import { db } from '../../db/mongo.js'
import tokenSchema from '../../schemas/tokenSchema.js'

export default async function tokenValidate(req, res, next) {
  const { error } = tokenSchema.validate(req.headers.authorization)

  if (error) return res.sendStatus(400)

  try {
    const token = req.headers.authorization.replace('Bearer ', '')

    const user = await db.collection('session').findOne({ token })

    if (user === null) return res.sendStatus(404)

    res.locals.user = user

    next()
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}
