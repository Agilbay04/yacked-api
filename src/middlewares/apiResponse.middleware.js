import { currentDate } from "../helpers/dateHelper.js";

export const apiResponse = (res, statusCode, message, data) => {
    res.status(statusCode).json({
        success: true,
        statusCode: statusCode,
        timestamp: currentDate(),
        message: Array.isArray(data) && data.length === 0 ? "Data tidak ditemukan!" : message,
        data: data,
        totalRecord: Array.isArray(data) ? data.length : 0
    });
}; 
