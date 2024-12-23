import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export const config = {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  db_uri: process.env.DB_URI,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  jwt_access_token: process.env.JWT_ACCESS_TOKEN,
};
