const { NODE_ENV } = require('../config/config');

const errorHandler = (err, req, res) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    let message;
    if (err.message === 'CastError') {
        message = 'Invalid ID';
    } else if (err.message === 'ValidationError') {
        message = Object.values(err.errors).map(e => e.message).join(', ');
    } else {
        message = err.message;
    }

    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl} ${new Date().toString()} ${req.ip} ${res.statusCode}`);

    res.status(statusCode).json({
        message: statusCode === 500 ? 'Something went wrong' : message,
        stack: NODE_ENV === 'production' ? null : err.stack
    });
}

const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

module.exports = { errorHandler, notFound };