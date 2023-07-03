import dotenv from "dotenv";

dotenv.config();

const config = {
  URL: "http://localhost",
  PORT: 4000,

  isProduction: process.env.NODE_ENV !== "development",

  ALLOWED_ORIGINS: JSON.parse(process.env.ALLOWED_ORIGINS),
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
};

export default config;
