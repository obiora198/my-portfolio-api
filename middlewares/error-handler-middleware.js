const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  const CustomError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "something went wrong, please try again later",
  };
  if(err.name === 'CastError') {
    CustomError.msg = `No item with id : ${err.value}`
    CustomError.statusCode = 404
  }
  return res.status(CustomError.statusCode).json({ msg: CustomError.msg });
};

module.exports = errorHandlerMiddleware;