//import products from "../data/products.js";
import Product from "../models/Product.js";
import asyncHandler from "../middleware/asyncHandler.js";

//Desc get all products
//GET /products
//Access Public
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).lean();
  if (products) {
    return res.status(200).json(products);
  } else {
    res.status(404);
    throw new Error("Products not found !!!");
  }
});

//Desc get product by Id
//GET /products
//Access Public
export const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).lean();
  if (product) {
    return res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error("Product not found !!!");
  }
});
