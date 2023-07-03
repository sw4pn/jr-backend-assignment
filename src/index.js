import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import config from "./config/config.js";
import corsOptions from "./config/corsOptions.js";

import authRoutes from "./routes/auth.routes.js";
import companyRoutes from "./routes/company.routes.js";
import orderRoutes from "./routes/order.routes.js";

import { ErrorHandler, notFoundHandler } from "./utils/ErrorHandler.js";

const port = config.PORT;

const app = express();

// middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth/", authRoutes);
app.use("/api/companies/", companyRoutes);
app.use("/api/orders/", orderRoutes);

// error handlers
app.use(notFoundHandler);
app.use(ErrorHandler);

app.listen(port, () => {
  console.log(`Server is running at ${config.URL}:${port}`);
});
