import { currentDate } from "../helpers/dateHelper.js";

export const apiResponseV2 = (statusCode, message, data) => {
    return {
        success: true,
        statusCode: statusCode,
        timestamp: currentDate(),
        message: Array.isArray(data) && data.length === 0 ? "Data tidak ditemukan!" : message,
        data: data,
        totalRecord: Array.isArray(data) ? data.length : 0
    };
};
