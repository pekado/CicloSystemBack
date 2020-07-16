const Product = require("../models/Product");

exports.createProduct = (req, res) => {
  console.log(req.body);
  try {
    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      imageData: req.file.path
    });
    newProduct.save();
    res.json({ newProduct });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server Error" });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server Error" });
  }
};

exports.updateProduct = async (req, res) => {
  console.log(req.body);
  try {
    const { name, price, imageData } = req.body;
    let currentProduct = await Product.findById(req.params.id);
    if (!currentProduct) {
      res.status(401).send({ msg: "Product doesn´t exist" });
    }
    const newProduct = {};
    newProduct.name = name;
    newProduct.price = price;
    newProduct.imageData = req.file.path;

    currentProduct = await Product.findOneAndUpdate(
      { _id: req.params.id },
      newProduct,
      { new: true }
    );
    res.json({ currentProduct });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server Error" });
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    let currentProduct = await Product.findById(req.params.id);
    if (!currentProduct) {
      res.status(401).send({ msg: "Product doesn´t exist" });
    }
    await Product.findByIdAndRemove({ _id: req.params.id });
    res.json({ msg: "Product deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server Error" });
  }
};
