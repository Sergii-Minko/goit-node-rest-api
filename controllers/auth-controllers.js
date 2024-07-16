import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as authServices from "../services/auth-services.js";

import HttpError from "../helpers/HttpError.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await authServices.findUser({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await authServices.signup({
    ...req.body,
    password: hashPassword,
  });

  res.status(201).json({
    subscription: newUser.subscription,
    email: newUser.email,
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await authServices.findUser({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const { _id: id } = user;

  const payload = { id };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });

  await authServices.updateUser({ _id: id }, { token });

  res.json({
    token,
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const signout = async (req, res) => {
  const { _id } = req.user;
  if (!user.token) {
    throw HttpError(401, "Not authorized");
  }

  await authServices.updateUser({ _id }, { token: "" });

  res.status(204);
};

const subscriptionStatus = async (req, res) => {
  const { _id } = req.user;
  //   const user = await authServices.findUser({ _id });

  //   if (!user) {
  //     throw HttpError(400, "Bad request");
  //   }
  const { subscription } = req.body;

  const newUser = await authServices.updateUser({ _id }, { subscription });

  res.status(200).json({
    subscription: newUser.subscription,
    email: newUser.email,
  });
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  signout: ctrlWrapper(signout),
  subscriptionStatus: ctrlWrapper(subscriptionStatus),
};
