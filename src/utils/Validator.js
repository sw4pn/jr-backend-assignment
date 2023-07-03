import Joi from "joi";
import bcrypt from "bcrypt";

/**
 *
 * Assignment A
 *
 * Validation handlers
 *
 */

const registerSchema = Joi.object({
  userName: Joi.string().empty().alphanum().required().min(6).max(12),
  password: Joi.string()
    .empty()
    .required()
    .min(6)
    .pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*]+$")),
  email: Joi.string().empty().required().email(),
}).options({ allowUnknown: true });

const loginSchema = Joi.object({
  userName: Joi.string().empty().alphanum().required().min(6).max(12),
  password: Joi.string()
    .empty()
    .required()
    .min(6)
    .pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*]+$")),
});

const validatePassword = async (password, hash) => {
  try {
    return await bcrypt.compareSync(password, hash);
  } catch (err) {
    throw err;
  }
};

const Validator = {
  loginSchema,
  registerSchema,
  validatePassword,
};

export default Validator;
