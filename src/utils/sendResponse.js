/**
 * Send uniform response
 */

const sendResponse = (
  req,
  res,
  statusCode,
  successCode,
  message,
  data = {}
) => {
  const obj = {
    success: successCode,
    message: message,
    ...data,
  };

  return res.status(statusCode).json(obj);
};

export default sendResponse;
