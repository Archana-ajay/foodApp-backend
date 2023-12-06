const express = require("express");
const app = express();
require("express-async-errors");
const cors = require("cors");
require("dotenv").config();
const db = require("./models");
const authenticateUser = require("./middleware/authentication");

const authRouter = require("./routes/auth");
const foodsRouter = require("./routes/food");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");
const addressRouter = require("./routes/address");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
app.use(cors());

// routes
app.use("/api/v1/", authRouter);
app.use("/api/v1/foods", foodsRouter);
app.use("/api/v1/", authenticateUser, cartRouter);
app.use("/api/v1/", authenticateUser, orderRouter);
app.use("/api/v1/", authenticateUser, addressRouter);

//middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

db.sequelize
    .sync()
    .then(() => {
        console.log("synced db");
    })
    .catch((err) => {
        console.log("failed" + err.message);
    });

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server is listening on ${port}...`);
});
