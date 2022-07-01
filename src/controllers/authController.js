import { db } from '../db/mongo.js'
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'

export const login = async (_, res) => {
  try {
    const { user } = res.locals

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
  try {
    const { name, email, password } = req.body

    const cryptPassword = bcrypt.hashSync(password, 10)

    const toSend = { name, email, password: cryptPassword, operations: [] }

    await db.collection('users').insertOne(toSend)

    return res.sendStatus(201)
  } catch (error) {
    return res.status(500).send(error)
  }
}
