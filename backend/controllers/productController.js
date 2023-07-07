import products from "../data/products.js";

//Desc get all products
//GET /products
//Access Public
export const getProducts = (req, res) => {
  res.status(200).json(products);
};
