const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({})
    .sort("name")
    .select("name price")
    .limit(10)
    .skip(1);
  res.status(200).json({ products, nbHits: products.length });
};

// get all products by ===>

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  // console.log(queryObject)
  let result = Product.find(queryObject);

  //sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort(createAt);
  }

  if (fields) {
    const fieldList = fields.split(",").join(" ");
    result = result.select(fieldList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit)
// so 23 items => limit of 7, = pages => 7, 7, 7, 2
// this works because page 1 - 1 = 0, and 7 (limit) * 0 == 0 ===> none are skipped (first 7 displayed)
// now if page 2, 2 (page) - 1 = 1, 1 * 7 (limit) = 7 ===> 7 are skipped
// and page 3, 3 (page -1) - 2, 2 * 7 (limit) = 14 ===> 14 are skipped and so on......




  //select
  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = { getAllProductsStatic, getAllProducts };
