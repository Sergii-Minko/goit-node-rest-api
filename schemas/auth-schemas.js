import Joi from "joi";

import {
  emailRegexp,
  validSubscriptions,
} from "../constants/user-constants.js";

export const authRegisterSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().valid(...validSubscriptions),
});

export const authLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export const authSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...validSubscriptions)
    .required(),
});
