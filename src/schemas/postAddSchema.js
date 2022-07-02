import Joi from 'joi'

const regex = /(?!^0,00$)(^(0|[1-9][0-9]*),\d{2}$)/

const bodySchema = Joi.object({
  value: Joi.string().max(11).pattern(regex).required(),
  description: Joi.string().trim().max(33).required(),
  operation: Joi.string().valid('input', 'exit').required()
})

export default bodySchema
