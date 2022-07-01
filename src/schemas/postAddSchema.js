import Joi from 'joi'

const regex = /(?!^0,00$)(^(0|[1-9][0-9]*),\d{2}$)/

const bodySchema = Joi.object({
  value: Joi.string().pattern(regex).required(),
  description: Joi.string().trim().required(),
  operation: Joi.string().valid('input', 'exit').required()
})

export default bodySchema
