import { db } from '../db/mongo.js'
import dayjs from 'dayjs'

export const getWallet = async (_, res) => {
  try {
    const { user } = res.locals

    const { operations, name } = await db
      .collection('users')
      .findOne({ _id: user.idUser })

    return res.status(200).send({ operations, name })
  } catch (error) {
    return res.status(500).send(error)
  }
}

export const postAdd = async (req, res) => {
  try {
    const { user } = res.locals

    const time = dayjs().format('DD/MM')

    await db
      .collection('users')
      .findOneAndUpdate(
        { _id: user.idUser },
        { $push: { operations: { ...req.body, time } } }
      )

    return res.sendStatus(200)
  } catch (error) {
    return res.status(500).send(error)
  }
}
