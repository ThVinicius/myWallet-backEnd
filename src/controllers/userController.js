import { db } from '../dbStrategy/mongo.js'
import Joi from 'joi'
import dayjs from 'dayjs'

const tokenSchema = Joi.string()
  .length(43)
  .pattern(/^Bearer /)
  .required()

export const getWallet = async (req, res) => {
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

export const postAdd = async (req, res) => {
  const bodySchema = Joi.object({
    value: Joi.number().precision(2).greater(0).strict().required(),
    description: Joi.string().trim().required(),
    operation: Joi.string().valid('input', 'exit').required()
  })

  const { error } = bodySchema.validate(req.body)
  const { error: tokenError } = tokenSchema.validate(req.headers.authorization)

  if (error || tokenError) return res.sendStatus(400)

  try {
    const token = req.headers.authorization.replace('Bearer ', '')

    const user = await db.collection('session').findOne({ token })
    console.log(user)

    if (user === null) return res.sendStatus(404)

    const time = dayjs().format('DD/MM')

    await db
      .collection('users')
      .findOneAndUpdate(
        { _id: user.idUser },
        { $push: { operations: { ...req.body, time } } }
      )

    return res.sendStatus(200)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}
