export const responseHandler = (req, res, next) => {
    const originalSend = res.send;

    res.send = (data) => {
        const formattedResponse = {
            success: true,
            status: res.statusCode,
            timestamp: new Date().toISOString(),
            data: data,
            totalRecord: data.length
        };
        originalSend.call(this, formattedResponse);
    };

    next();
};

export const errorHandler = (err, req, res, next) => {
    console.log("Middleware Error Hadnling");
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || "Error invalid data!";
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        timestamp: new Date().toISOString(),
        stack: err.stack
    });
};
