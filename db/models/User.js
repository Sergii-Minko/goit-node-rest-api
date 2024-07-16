import { Schema, model } from "mongoose";

import { mongoSaveError, setMongoUpdateSettings } from "./hooks.js";

import {
  emailRegexp,
  validSubscriptions,
} from "../../constants/user-constants.js";

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      match: emailRegexp,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    subscription: {
      type: String,
      enum: validSubscriptions,
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", mongoSaveError);

userSchema.pre("findOneAndUpdate", setMongoUpdateSettings);

userSchema.post("findOneAndUpdate", mongoSaveError);

const User = model("user", userSchema);

export default User;
