import express from "express";
import dotenv from "dotenv";
dotenv.config();
import productRouter from "./routes/productRoutes.js";
import connectDB from "./config/connectDB.js";

import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API running ...");
});

app.use("/api", productRouter);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on PORT:${PORT}...`);
  });
};
start();
