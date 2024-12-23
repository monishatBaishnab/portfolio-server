import { model, Schema } from "mongoose";
import { TUser } from "./auth.types";
import bcrypt from "bcrypt";
import { config } from "../../config/config";

const UserSchema = new Schema<TUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: { type: String, required: false, default: null },
});

UserSchema.pre("save", async function (next) {
  const userData = this;
  // hashing password and save into DB
  userData.password = await bcrypt.hash(
    userData.password as string,
    Number(config.bcrypt_salt_round)
  );

  next();
});

UserSchema.pre("find", async function (next) {
  this.find({ isDeleted: { $ne: true } }).select("-password");
  next();
});

UserSchema.pre("findOne", async function (next) {
  this.find({ isDeleted: { $ne: true } }).select("-password");
  next();
});

export const User = model<TUser>("User", UserSchema);
