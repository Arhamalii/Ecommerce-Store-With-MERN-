const express = require("express");
const { isAdmin, requireSignIn } = require("../middleware/authMiddleware");
const {
  createProductController,
  getProductController,
  getSingleProductController,
  getProductPhotoController,
  deleteProductController,
  updateProductController,
} = require("../controllers/productController");
const formidable = require("express-formidable");
const router = express.Router();

// @method POST
// @acess only admin
// @desc create product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// @method PUT
// @acess only admin
// @desc update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// @method GET
// @acess anyone
// @desc get all product

router.get("/get-product", getProductController);

// @method GET
// @acess anyone
// @desc get single product by slug/name

router.get("/get-product/:slug", getSingleProductController);

// @method GET
// @acess anyone
// @desc get product photo

router.get("/product-photo/:pid", getProductPhotoController);

// @method DELETE
// @acess private
// @desc delete product

router.delete("/product/:id", deleteProductController);
module.exports = router;