//import products from "../data/products.js";
import Product from "../models/Product.js";
import asyncHandler from "../middleware/asyncHandler.js";

//Desc get all products
//GET /products
//Access Public
const getProducts = asyncHandler(async (req, res) => {
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
const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).lean();
  if (product) {
    return res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error("Product not found !!!");
  }
});

//Desc create new product
//POST /products
//Access Private/Admin

const createProduct = asyncHandler(async (req, res) => {
  const newProduct = new Product({
    user: req.user._id,
    name: "Product Sample",
    description: "Product Sample Description",
    brand: "Sample Brand",
    category: "Sample Category",
    image: "/images/sample.jpg",
    price: 0,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
  });
  const createdProduct = await newProduct.save();

  if (createProduct) {
    res.status(201).json(createdProduct);
  } else {
    res.status(500);
    throw new Error("Invalid Product Data");
  }
});

export { getProduct, getProducts, createProduct };
