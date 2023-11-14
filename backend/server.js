const express = require('express');
require('dotenv').config();

const { PORT, NODE_ENV } = require('./config/config');
const connectDB = require('./config/db');
const { errorHandler, notFound} = require('./middlewares/errorMiddleware');

const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);

app.use(notFound);
app.use((err, req, res, next) => {
    if (err) {
        next(err);
    } else {
        console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl} ${new Date().toString()} ${req.ip} ${res.statusCode}`);
        next();
    }
});
app.use(errorHandler);


app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
});