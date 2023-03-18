const getAllProductsStatic = async (req, res) => {
  throw new Error("Testing async error")
  res.status(200).json({ msg: "Products Test route" });
};

const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: "Testing two" });
};

module.exports = { getAllProductsStatic, getAllProducts };
