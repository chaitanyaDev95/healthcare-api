const Joi = require('joi')

module.exports = {
  validateRequest: schema => async (req, res, next) => {
    // schema options
    const options = {
      abortEarly: false, // include all errors
      allowUnknown: true, // ignore unknown props
      stripUnknown: true // remove unknown props
    };
    const { error } = schema.validate(req.body, options)

    if (error) {
      //   throw new Error(error)
      return res.status(400).json({ "status": false, "error": error })
    }

    return next()
  },

  UserRegisterSchema: Joi.object().keys({
    userName: Joi.string().required(),
    userEmail: Joi.string().email().min(5).max(50).optional(),
    password: Joi.string().min(3).max(15).required(),
    passwordConfirmation: Joi.any().valid(Joi.ref('password')).required()
  })
}
