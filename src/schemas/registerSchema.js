import Joi from 'joi'

const userSchema = Joi.object({
  name: Joi.string().trim().max(17).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required()
})

export default userSchema
