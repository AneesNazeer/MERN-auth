import Joi from "joi";

export const itemSchema = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().max(200),
  price: Joi.number().greater(0).required(),
});
