import { Router } from "express";

import authControllers from "../controllers/auth-controllers.js";

import isEmptyBody from "../middlewares/isEmptyBody.js";
import authenticate from "../middlewares/authenticate.js";

import validateBody from "../decorators/validateBody.js";

import upload from "../middlewares/upload.js";

import {
  authRegisterSchema,
  authLoginSchema,
  authSubscriptionSchema,
  emailSchema,
} from "../schemas/auth-schemas.js";

const authRouter = Router();

authRouter.post(
  "/register",
  isEmptyBody,
  validateBody(authRegisterSchema),
  authControllers.signup
);

authRouter.post(
  "/login",
  isEmptyBody,
  validateBody(authLoginSchema),
  authControllers.signin
);

authRouter.get("/current", authenticate, authControllers.getCurrent);

authRouter.post("/logout", authenticate, authControllers.signout);

authRouter.patch(
  "/",
  isEmptyBody,
  validateBody(authSubscriptionSchema),
  authenticate,
  authControllers.subscriptionStatus
);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authControllers.updateAvatar
);

authRouter.get("/verify/:verificationToken", authControllers.verifyEmail);

authRouter.post("/verify", validateBody(emailSchema), authControllers.resendVerifyEmail);

export default authRouter;
