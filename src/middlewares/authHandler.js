import expressAsyncHandler from "express-async-handler";
import TokenUtils from "../utils/TokenUtils.js";
import { createError } from "../utils/ErrorHandler.js";

/**
 * Middleware - Allow only logged in users
 */
const authMiddleware = expressAsyncHandler(async (req, res, next) => {
  const clientAccessToken = TokenUtils.getClientToken(req);

  if (!clientAccessToken) {
    // tokens not available
    // stop here.
    return next(
      createError(401, "You must be logged in to access this request.")
    );
  }

  let token = TokenUtils.verifyAccessToken(clientAccessToken);

  if (!token) {
    return next(createError(401, "Session Expired, Please login again."));
  }

  res.locals.token = token;
  next();
});

export { authMiddleware };
