import { db, objectId } from '../db/mongo.js'
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

    const id = objectId()

    await db
      .collection('users')
      .findOneAndUpdate(
        { _id: user.idUser },
        { $push: { operations: { ...req.body, time, id } } }
      )

    return res.sendStatus(200)
  } catch (error) {
    return res.status(500).send(error)
  }
}

export const deleteRecord = async (req, res) => {
  const { idUser: _id } = res.locals.user
  const { id } = req.params

  try {
    const { modifiedCount } = await db
      .collection('users')
      .updateOne({ _id }, { $pull: { operations: { id: objectId(id) } } })

    if (modifiedCount === 0) return res.sendStatus(404)

    return res.sendStatus(200)
  } catch (error) {
    return res.status(500).send(error)
  }
}
