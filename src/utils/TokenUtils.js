import JWT from "jsonwebtoken";
import config from "../config/config.js";

/**
 *
 *  JWT Toke handler utility
 *
 */

const signAccessToken = (payload) => {
  const options = {
    expiresIn: 5 * 60 * 60,
  };

  return JWT.sign(payload, config.ACCESS_TOKEN_SECRET, options);
};

const signRefreshToken = (payload) => {
  const options = {
    expiresIn: 7 * 24 * 60 * 60,
  };

  return JWT.sign(payload, config.REFRESH_TOKEN_SECRET, options);
};

const defaultCookieOptions = {
  httpOnly: true,
  secure: config.isProduction,
  sameSite: config.isProduction ? "strict" : "lax",
  domain: config.domain,
  path: "/",
};

const accessCookieOptions = {
  ...defaultCookieOptions,
  maxAge: 5 * 60 * 60 * 1000,
};

const refreshCookieOptions = {
  ...defaultCookieOptions,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const getTokens = (id) => {
  const accessPayload = { id };
  const refreshPayload = { id };

  const accessToken = signAccessToken(accessPayload);
  const refreshToken = refreshPayload && signRefreshToken(refreshPayload);

  return { accessToken, refreshToken };
};

const setTokens = (res, access, refresh) => {
  res.cookie("access", access, accessCookieOptions);
  if (refresh) res.cookie("refresh", refresh, refreshCookieOptions);
};

const clearTokens = (res) => {
  res.cookie("access", "", { ...defaultCookieOptions, maxAge: 0 });
  res.cookie("refresh", "", { ...defaultCookieOptions, maxAge: 0 });
};

const verifyAccessToken = (token) => {
  try {
    return JWT.verify(token, config.ACCESS_TOKEN_SECRET);
  } catch (err) {
    return undefined;
  }
};

const getClientToken = (req, refresh = false) => {
  const cookieName = refresh ? "refresh" : "access";
  const cookie = req.cookies[cookieName];
  const headers = req.headers;

  if (cookie) {
    return cookie;
  }

  if (headers && headers.authorization) {
    const authHeaders = headers.authorization;

    if (authHeaders.startsWith("Bearer ")) {
      return authHeaders.substring(7);
    }
  }

  return undefined;
};

const TokenUtils = {
  getTokens,
  setTokens,
  clearTokens,
  getClientToken,
  verifyAccessToken,
};

export default TokenUtils;
