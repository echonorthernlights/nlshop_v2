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
    image: "/images/sample.png",
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

// DESC    Update a product
// PUT     /api/products/:id
// Access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    console.log(updatedProduct);
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// DESC    Update a product
// PUT     /api/products/:id
// Access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// DESC    Create a product review
// PUT     /api/products/:id/reviews
// Access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const { rating, comment } = req.body;
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed !");
    }
    const review = {
      name: req.user.name,
      user: req.user._id,
      comment,
      rating: Number(rating),
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, curr) => acc + curr.rating, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getProduct,
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  createProductReview,
};
