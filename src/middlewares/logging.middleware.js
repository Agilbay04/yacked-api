export const infoLog = (req, res, next) => {
    console.log(`[${new Date().toJSON()}] ${req.method} - ${req.originalUrl} - ${res.statusCode}`);
    next();
};

export const errorLog = (err, req, res, next) => {
    console.log(`[${new Date().toJSON()}] ${req.method} - ${req.originalUrl} - ${err.statusCode} - ${err.stack}`);
    next(err);
};
