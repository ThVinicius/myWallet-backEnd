import { db } from '../dbStrategy/mongo.js'
import Joi from 'joi'
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'

export const login = async (req, res) => {
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  })

  const { error } = loginSchema.validate(req.body)

  if (error) return res.sendStatus(400)

  try {
    const { email, password } = req.body

    const user = await db.collection('users').findOne({ email })

    const compare = bcrypt.compareSync(password, user.password)

    if (!compare && user) return res.sendStatus(401)

    const token = uuid()

    await db.collection('session').findOneAndUpdate(
      { idUser: user._id },
      { $set: { idUser: user._id, token } },
      {
        upsert: true
      }
    )

    return res.status(201).send({ token })
  } catch (error) {
    return res.status(500).send(error)
  }
}

export const register = async (req, res) => {
  const userSchema = Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  })

  const { error } = userSchema.validate(req.body)

  if (error) return res.sendStatus(400)

  try {
    const { name, email, password } = req.body

    const search = await db.collection('users').findOne({ email })

    if (search !== null) return res.sendStatus(409)

    const cryptPassword = bcrypt.hashSync(password, 10)

    const toSend = { name, email, password: cryptPassword, operations: [] }

    await db.collection('users').insertOne(toSend)

    return res.sendStatus(201)
  } catch (error) {
    return res.status(500).send(error)
  }
}
