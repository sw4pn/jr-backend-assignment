import dotenv from "dotenv";

dotenv.config();

const config = {
  // URL: "http://localhost",
  URL: "https://test-server-9lwq.onrender.com/",
  PORT: 4000,

  isProduction: process.env.NODE_ENV !== "development",

  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
};

export default config;
