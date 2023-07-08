import express from "express";
import { getProducts, getProduct } from "../controllers/productController.js";

const router = express.Router();
router.route("/products").get(getProducts);
router.route("/products/:id").get(getProduct);

export default router;
