import products from "../data/products.js";

//Desc get all products
//GET /products
//Access Public
export const getProducts = (req, res) => {
  res.status(200).json(products);
};

//Desc get all products
//GET /products
//Access Public
export const getProduct = (req, res) => {
  const { id } = req.params;
  const product = products.find((p) => p._id === id);

  res.status(200).json(product);
};
