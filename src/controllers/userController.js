import { db } from '../dbStrategy/mongo.js'
import Joi from 'joi'

export const getWallet = async (req, res) => {
  const tokenSchema = Joi.string()
    .length(43)
    .pattern(/^Bearer /)
    .required()

  const { error } = tokenSchema.validate(req.headers.authorization)

  if (error) return res.sendStatus(400)

  try {
    const token = req.headers.authorization.replace('Bearer ', '')

    const user = await db.collection('session').findOne({ token })

    if (user === null) return res.sendStatus(404)

    const { operations } = await db
      .collection('users')
      .findOne({ _id: user.idUser })

    return res.status(200).send(operations)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}
