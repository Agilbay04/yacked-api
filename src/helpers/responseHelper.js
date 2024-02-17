export const successResponse = (res, statusCode, message, data, total) => {
    res.status(statusCode).json({
        status: 'success',
        message: message,
        data: data,
        totalRecord: total 
    });
}; 

export const errorResponse = (res, statusCode, message, error) => {
    res.status(statusCode).json({
        status: 'error',
        message: message,
        error: error
    });
};