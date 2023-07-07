import express from "express";
import dotenv from "dotenv";
dotenv.config();
import productRouter from "./routes/productRoutes.js";
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API running ...");
});

app.use("/products", productRouter);
app.listen(PORT, () => {
  console.log(`Server running on PORT:${PORT}...`);
});
