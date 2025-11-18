import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const createHash = (password) => {
  const rounds = Number(process.env.PASSWORD_SALT_ROUNDS || 10);
  return bcrypt.hashSync(password, bcrypt.genSaltSync(rounds));
};

export const isValidatePassword = (plain, hash) => {
  if (!plain || !hash) return false;
  return bcrypt.compareSync(plain, hash);
};

export const generateToken = (payload, expiresIn = "1h") => {
  const secret = process.env.JWT_SECRET || "changeme";
  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyToken = (token, secret = process.env.JWT_SECRET) => {
  return jwt.verify(token, secret);
};

export const hashToken = (tokenPlain) => {
  return crypto.createHash("sha256").update(tokenPlain).digest("hex");
};
