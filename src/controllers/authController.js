import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import Validator from "../utils/Validator.js";
import { createError } from "../utils/ErrorHandler.js";
import prisma from "../config/prisma-client.js";
import sendResponse from "../utils/SendResponse.js";
import TokenUtils from "../utils/TokenUtils.js";

/**
 * Register a user
 */
export const registerUser = expressAsyncHandler(async (req, res, next) => {
  const { value, error } = Validator.registerSchema.validate(req.body);

  const { userName, email, password, mobile, companyId } = value;

  if (error) {
    return next(createError(422, error?.message));
  }

  const checkUser = await prisma.user.findFirst({
    where: { OR: [{ userName }, { email }] },
  });

  if (checkUser)
    return next(
      createError(404, "User with the username or email already exist.")
    );

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const user = await prisma.user.create({
    data: { userName, email, password: hashedPassword, mobile, companyId },
    select: {
      userId: true,
      userName: true,
      email: true,
      mobile: true,
      companyId: true,
    },
  });

  if (!user) {
    return next(createError(500, "Internal Server Error."));
  }

  const { accessToken, refreshToken } = TokenUtils.getTokens(user.userId);

  TokenUtils.setTokens(res, accessToken, refreshToken);

  const userData = {
    user,
    accessToken,
    refreshToken,
  };

  return sendResponse(req, res, 200, true, "success", userData);
});

/**
 * Login user & provide token
 */
export const loginUser = expressAsyncHandler(async (req, res, next) => {
  const { value, error } = Validator.loginSchema.validate(req.body);

  if (error) {
    return next(createError(422, error?.message));
  }

  const { userName, password } = value;

  const user = await prisma.user.findUnique({ where: { userName } });

  if (!user) return next(createError(404, "User does not exist."));

  const isPasswordValid = await Validator.validatePassword(
    password,
    user.password
  );

  if (!isPasswordValid) {
    return next(createError(401, "Invalid Username or Password."));
  }

  const { accessToken, refreshToken } = TokenUtils.getTokens(user.userId);

  TokenUtils.setTokens(res, accessToken, refreshToken);

  const userData = {
    user,
    accessToken,
    refreshToken,
  };

  return sendResponse(req, res, 200, true, "success", userData);
});

/**
 * Logout user and clear tokens
 */
export const logoutUser = expressAsyncHandler(async (req, res, next) => {
  TokenUtils.clearTokens(res);

  return sendResponse(req, res, 204, true);
});

/**
 * Get self user
 */
export const getUser = expressAsyncHandler(async (req, res, next) => {
  const token = res.locals.token;

  if (!token.id) {
    return next(
      createError(401, "Token invalid or expired, Please login again.")
    );
  }

  const user = await prisma.user.findUnique({ where: { userId: token.id } });

  if (!user) {
    return next(
      createError(500, "Error occurred while verifying user authentication.")
    );
  }
  return sendResponse(req, res, 200, true, "success", user);
});

/**
 * Get all users
 */
export const getAllUsers = expressAsyncHandler(async (req, res, next) => {
  const allUsers = await prisma.user.findMany();

  if (!allUsers) {
    return next(createError(500, "Error while fetching users"));
  }

  return sendResponse(req, res, 200, true, "success", { data: allUsers });
});
