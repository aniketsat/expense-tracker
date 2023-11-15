const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { PORT, NODE_ENV } = require('./config/config');
const connectDB = require('./config/db');
const { errorHandler, notFound} = require('./middlewares/errorMiddleware');

const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
});