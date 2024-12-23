import { Secret } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { TUser } from "../modules/auth/auth.types";

// Define the structure of the token payload
export type TTokenData = {
  id?: string;
  email: string;
  profile: string;
};

// Function to sanitize and structure user data for token creation
export const sanitizeTokenData = (userData: TUser): TTokenData => {
  const tokenData = {
    id: userData.id,
    email: userData.email,
    profile: userData?.profile,
  };

  return tokenData;
};

// Function to generate a JSON Web Token (JWT) using the provided payload and secret
export const generateToken = (payload: TTokenData, secret: Secret, expiresIn = "10d") => {
  const token = jwt.sign(payload, secret, { expiresIn });
  return token;
};

// Function to verify the provided token and extract the payload data
export const verifyToken = (token: string, secret: Secret): TTokenData => {
  const verified_user = jwt.verify(token, secret);
  return verified_user as TTokenData;
};
