import Joi from 'joi';

const saveSchema = Joi.object({
  name: Joi.string().min(3).required(),
  ingredientName: Joi.array().length(1),
  ingredientPrice: Joi.array().length(1)
});

const showSchema = Joi.object({
  id: Joi.string().required(),
})

export { saveSchema, showSchema }
