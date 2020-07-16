const express = require("express");
const router = express.Router();
const ProductsController = require("../controllers/productsController.js");
const UploadController = require("../controllers/uploadController");
const auth = require("../middleware/auth");

router.get("/", ProductsController.getProducts
)

router.post(
  "/",
  UploadController.upload.single("imageData"),
  ProductsController.createProduct
);

router.put("/:id", UploadController.upload.single("imageData"), ProductsController.updateProduct)

router.delete("/:id", ProductsController.deleteProduct)

module.exports = router;
