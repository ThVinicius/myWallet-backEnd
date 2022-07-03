import Joi from 'joi'

const bodySchema = Joi.object({
  value: Joi.number().max(99999999.99).required(),
  description: Joi.string().trim().max(33).required(),
  operation: Joi.string().valid('input', 'exit').required()
})

export default bodySchema
