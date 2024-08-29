import { currentDate } from "../helpers/dateHelper.js";
import ResponseError from "../exception/responseError.js";
import { Prisma } from "@prisma/client";

export const errorResponse = (res, statusCode, message, err) => {
    res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        timestamp: currentDate(),
        message: message,
        error: Array.isArray(err) ? "Validation error!" : err.stack
    });
};

export const errorHandler = (err, req, res, next) => {
    if (err instanceof ResponseError) {
        errorResponse(res, err.statusCode, err.message, err);
    } else if (err.errors && Array.isArray(err.errors)) {
        const errArr = transformErrorValidation(err.array());
        console.log(errArr);
        errorResponse(res, 400, errArr, err.array());
    } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
            errorResponse(res, 409, 'Unique constraint violation', err);
        } else if (err.code === 'P2025') {
            errorResponse(res, 404, 'Record not found', err);
        } else {
            errorResponse(res, 400, 'Prisma known request error', err);
        }
    } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
        errorResponse(res, 500, 'An unknown error occurred with the database.', err);
    } else if (err instanceof Prisma.PrismaClientRustPanicError) {
        errorResponse(res, 500, 'A critical error occurred with the database engine.', err);
    } else if (err instanceof Prisma.PrismaClientInitializationError) {
        errorResponse(res, 500, 'Failed to initialize the database connection.', err);
    } else if (err instanceof Prisma.PrismaClientValidationError) {
        errorResponse(res, 400, 'Validation failed: ' + err.message, err);
    } else {
        const statusCode = err.statusCode || 500;
        const message = err.message || 'An unexpected error occurred';
        errorResponse(res, statusCode, message, err);
    }
};

const transformErrorValidation = (errorArr) =>
    Object.values(errorArr.reduce((acc, item) => {
        if (!acc[item.path]) {
            acc[item.path] = {
                field: item.path,
                errorMsg: []
            };
        }

        acc[item.path].errorMsg.push(item.msg);
        
        return acc;
    
    }, {}));
