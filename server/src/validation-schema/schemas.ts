import Joi from '@hapi/joi';

export const signUpValidationSchema = Joi.object().keys({
  fullname: Joi.string()
    .min(3)
    .max(30)
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),

  password: Joi.string()
    .min(6)
    .max(30)
    .required()
});

export const signInValidationSchema = Joi.object().keys({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),

  password: Joi.string()
    .min(6)
    .max(30)
    .required()
});
