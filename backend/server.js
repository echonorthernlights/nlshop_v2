import express from "express";
import dotenv from "dotenv";
dotenv.config();
import productRouter from "./routes/productRoutes.js";
import connectDB from "./config/connectDB.js";
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API running ...");
});

app.use("/products", productRouter);

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on PORT:${PORT}...`);
  });
};
start();
