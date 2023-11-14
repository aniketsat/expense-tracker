const jwt = require('jsonwebtoken');

const generateToken = (id, secret, expiresIn) => {
    return jwt.sign({ id }, secret, { expiresIn });
}

const verifyToken = (token, secret) => {
    let statusCode = 200;
    const decoded = jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                statusCode = 403;
            } else {
                statusCode = 401;
            }
        }
        return decoded;
    });
    return { decoded, statusCode };
}

module.exports = { generateToken, verifyToken };