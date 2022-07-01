import bodySchema from '../../schemas/postAddSchema.js'

export default async function postAddValidate(req, res, next) {
  const { error } = bodySchema.validate(req.body)

  if (error) return res.sendStatus(400)

  next()
}
