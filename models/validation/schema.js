const joi = require("joi");

const userSchema = joi
  .object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    profileImage: joi.string().required(),
  })
  .unknown();

const categorySchema = joi
  .object({
    name: joi.string().required(),
    limits: joi
      .object()
      .keys({
        weekly: joi.number().required(),
        monthly: joi.number().required(),
      })
      .required(),
  })
  .unknown();

const expenseSchema = joi
  .object({
    name: joi.string().required(),
    amount: joi.number().required(),
  })
  .unknown();

const commentSchema = joi
  .object({
    text: joi.string().required(),
  })
  .unknown();

module.exports = { userSchema, categorySchema, expenseSchema, commentSchema };
