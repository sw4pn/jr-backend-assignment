import expressAsyncHandler from "express-async-handler";
import prisma from "../config/prisma-client.js";
import { createError } from "../utils/ErrorHandler.js";
import sendResponse from "../utils/SendResponse.js";

import { subDays } from "date-fns";

/**
 *
 * Assignment routes
 *
 */

/**
 * Get users by company Id
 */
export const getUsersByCompanyId = expressAsyncHandler(
  async (req, res, next) => {
    const id = parseInt(req.params.id);

    if (!id || id === null || id === NaN) {
      return next(createError(404, "Company id is invalid or does not exist."));
    }

    const users = await prisma.user.findMany({ where: { companyId: id } });

    if (!users) {
      return next(createError(500, "Error while getting users."));
    }

    return sendResponse(req, res, 200, true, undefined, { data: users });
  }
);

/**
 * Get recent 7 days orders
 */
export const getRecentOrders = expressAsyncHandler(async (req, res, next) => {
  // date  7 days ago
  const startDate = subDays(new Date(), 7);

  const recentOrders = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: startDate,
      },
    },
  });

  if (!recentOrders) {
    return next(createError(500, "Error while getting users."));
  }

  return sendResponse(req, res, 200, true, undefined, { data: recentOrders });
});

/***
 *
 * Other routes
 *
 */

/**
 * Get all companies
 */
export const getAllCompanies = expressAsyncHandler(async (req, res, next) => {
  const allCompanies = await prisma.company.findMany();

  if (!allCompanies) {
    return next(createError(500, "Error while fetching companies"));
  }

  return sendResponse(req, res, 200, true, "success", allCompanies);
});

/**
 * Get all orders
 */
export const getAllOrders = expressAsyncHandler(async (req, res, next) => {
  const allOrders = await prisma.order.findMany();

  if (!allOrders) {
    return next(createError(500, "Error while fetching orders"));
  }

  return sendResponse(req, res, 200, true, "success", allOrders);
});

/**
 * Create a company
 */
export const createCompany = expressAsyncHandler(async (req, res, next) => {
  const company = await prisma.company.create({
    data: { ...req.body },
  });

  if (!company) {
    return next(createError(500, "Error while creating company"));
  }

  return sendResponse(req, res, 200, true, "success", company);
});

/**
 * Create a order
 */
export const createOrder = expressAsyncHandler(async (req, res, next) => {
  const order = await prisma.order.create({
    data: { ...req.body },
  });

  if (!order) {
    return next(createError(500, "Error while creating order"));
  }

  return sendResponse(req, res, 200, true, "success", order);
});

/**
 * Update a order
 */
export const updateOrder = expressAsyncHandler(async (req, res, next) => {
  const id = parseInt(req.params.id);

  if (!id) {
    return next(createError(404, "No order with this id."));
  }

  const updatedOrder = await prisma.order.update({
    data: { ...req.body },
    where: { orderId: id },
  });

  if (!updatedOrder) {
    return next(createError(500, "Error while updating order"));
  }

  return sendResponse(req, res, 200, true, "success", updatedOrder);
});

/**
 * Update a company
 */
export const updateCompany = expressAsyncHandler(async (req, res, next) => {
  const id = parseInt(req.params.id);

  if (!id) {
    return next(createError(404, "No company with this id."));
  }

  const updatedCompany = await prisma.company.update({
    data: { ...req.body },
    where: { companyId: id },
  });

  if (!updatedCompany) {
    return next(createError(500, "Error while updating company"));
  }

  return sendResponse(req, res, 200, true, "success", updatedCompany);
});
