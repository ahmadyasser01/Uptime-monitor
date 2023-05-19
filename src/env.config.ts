import { cleanEnv, port, str } from "envalid";
import dotenv from "dotenv";
dotenv.config();
const env = cleanEnv(process.env, {
  PORT: port(),
  DATABASE_URI: str(),
  JWT_TOKEN: str(),
});

export default env;
