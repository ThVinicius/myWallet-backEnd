import Joi from 'joi'

const userSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
})

export default userSchema
