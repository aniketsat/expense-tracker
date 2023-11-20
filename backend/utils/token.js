const jwt = require('jsonwebtoken');

const generateToken = (id, secret, expiresIn) => {
    return jwt.sign({ id }, secret, { expiresIn });
}

const verifyToken = (token, secret) => {
    let statusCode = 200;
    try {
        const decoded = jwt.verify(token, secret);
        return { decoded, statusCode };
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            statusCode = 403;
        } else {
            statusCode = 401;
        }
        return { decoded: null, statusCode };
    }
}

module.exports = { generateToken, verifyToken };