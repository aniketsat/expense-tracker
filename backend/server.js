const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { PORT, NODE_ENV } = require('./config/config');
const connectDB = require('./config/db');
const { errorHandler, notFound} = require('./middlewares/errorMiddleware');

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const otpRoutes = require('./routes/otpRoutes');
const accountRoutes = require('./routes/accountRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/categories', categoryRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
});