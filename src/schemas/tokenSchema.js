import Joi from 'joi'

const tokenSchema = Joi.string()
  .length(43)
  .pattern(/^Bearer /)
  .required()

export default tokenSchema
