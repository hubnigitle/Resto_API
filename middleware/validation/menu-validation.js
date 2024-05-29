// eslint-disable-next-line import/no-extraneous-dependencies
const Joi = require('joi');
const CLientError = require('../../errors/ClientError');

const schema = Joi.object({
  menu: Joi.string()
    .min(5)
    .max(50)
    .required(),
  deskripsi: Joi.string()
    .min(15)
    .max(100)
    .required(),
  harga: Joi.number()
    .min(5000)
    .max(1000000)
    .required(),
  kategoriId: Joi.string().uuid()
    .required(),
  ukurans: Joi.array().items(
    Joi.object({
      id: Joi.string().uuid().required(),
    }),
  ),
});

const validate = (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);

    if (error) {
      throw new CLientError(error.message);
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validate;
