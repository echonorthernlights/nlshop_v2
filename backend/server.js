import express from "express";
import dotenv from "dotenv";
dotenv.config();
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

import connectDB from "./config/connectDB.js";

import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
const app = express();
const PORT = process.env.PORT || 5000;

//Body parser middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Cookie parser middleware
app.use(cookieParser());

// app.get("/", (req, res) => {
//   res.send("API running ...");
// });

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

//PayPal configuration
app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on PORT:${PORT}...`);
  });
};
start();
