import objectIdSchema from '../../schemas/objectIdSchema.js'

export default async function idParamsValidate(req, res, next) {
  const { error } = objectIdSchema.validate(req.params)

  if (error) return res.sendStatus(400)

  next()
}
