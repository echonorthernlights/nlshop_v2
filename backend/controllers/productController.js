//import products from "../data/products.js";
import Product from "../models/Product.js";
import asyncHandler from "../middleware/asyncHandler.js";
//@desc get all products
//@route GET  /products
//@access Public
const getProducts = asyncHandler(async (req, res) => {
  //Pagination logic
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = req.query.pageNumber || 1;

  //Construct keyword object for query search
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};
  const count = await Product.countDocuments({ ...keyword });

  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  //End pagination
  if (products) {
    return res
      .status(200)
      .json({ products, page, pages: Math.ceil(count / pageSize) });
  } else {
    res.status(404);
    throw new Error("Products not found !!!");
  }
});

//@desc get product by Id
//@route GET  /products;:id
//@access Public
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

//@desc   create new product
//@route  POST  /products
//@access Private/Admin

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

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
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
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Update a product
// @route   PUT  /api/products/:id
// @access  Private/Admin
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

// @desc   Create a product review
// @route  POST /api/products/:id/reviews
// @access  Private
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
//@desc  get top three product (rating)
//@route GET /api/products/top
//@access Public
const getTopRatedProducts = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  if (products) {
    return res.status(200).json(products);
  } else {
    res.status(404);
    throw new Error("Products not found !!!");
  }
});

export {
  getProduct,
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  createProductReview,
  getTopRatedProducts,
};
