const express = require('express');
const app = express();
require('express-async-errors');
const cors=require('cors')
require('dotenv').config();
const connectDB = require('./db/connect');
const authenticateUser = require('./middleware/authentication');

const authRouter = require('./routes/auth');
const foodsRouter = require('./routes/food');
const cartRouter=require('./routes/cart')
const orderRouter=require('./routes/order')

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


app.use(express.json());
app.use(cors())

// routes
app.use('/api/v1/', authRouter);
app.use('/api/v1/foods', foodsRouter);
app.use('/api/v1/',authenticateUser,cartRouter)
app.use('/api/v1/',authenticateUser,orderRouter)

//middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI); //database
        app.listen(port, () =>
           
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        
        console.log(error);
    }
};

start();