const Product = require("../models/product")


const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({company: "ikea"})
  res.status(200).json({products, nbHits: products.length});
};

const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: "Testing two" });
};

module.exports = { getAllProductsStatic, getAllProducts };
