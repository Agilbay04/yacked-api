import { currentDate } from "../helpers/dateHelper.js";

export const apiResponse = (res, statusCode, message, data) => {
    res.status(statusCode).json({
        success: true,
        status: statusCode,
        timestamp: currentDate(),
        message: message,
        data: data,
        totalRecord: Array.isArray(data) ? data.length : 0
    });
}; 

export const errorResponse = (res, statusCode, message, err) => {
    res.status(statusCode).json({
        success: false,
        status: statusCode,
        timestamp: currentDate(),
        message: message,
        error: err.stack
    });
};

export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'An unexpected error occurred';
    errorResponse(res, statusCode, message, err);
};

export const throwError = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    throw error;
};
