const productModel = require("../models/productModel");
const fs = require("fs");
const slugify = require("slugify");

const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    //validation
    switch (true) {
      case !category:
        return res
          .status(200)
          .send({ success: false, message: "Category is required" });
      case !photo:
        return res
          .status(200)
          .send({ success: false, message: "Photo is required" });
      case photo && photo.size > 1000000:
        return res.status(200).send({
          success: false,
          message: "Photo Must be less than 1mb",
        });
      case !name:
        return res
          .status(200)
          .send({ success: false, message: "Name is required" });
      case !price:
        return res
          .status(200)
          .send({ success: false, message: "Price is required" });
      case !quantity:
        return res
          .status(200)
          .send({ success: false, message: "Quantity is required" });
      case !description:
        return res
          .status(200)
          .send({ success: false, message: "Description is required" });
    }

    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
      await products.save();
      res.status(201).send({
        success: true,
        message: "Product Created Successfully",
        products,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating product",
      error,
    });
  }
};

const getProductController = async (req, res) => {
  try {
    const allProducts = await productModel
      .find({})
      .select("-photo")
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      totalCount: allProducts.length,
      message: "Products Get Successfully",
      allProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting products",
      error,
    });
  }
};

const getSingleProductController = async (req, res) => {
  try {
    const singleProduct = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");

    res.status(200).send({
      success: true,
      message: "Porduct Fetchhed Successfully",
      singleProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting single product",
      error,
    });
  }
};

const getProductPhotoController = async (req, res) => {
  try {
    const productPhoto = await productModel
      .findById(req.params.pid)
      .select("photo");
    if (productPhoto.photo.data) {
      res.set("Content-type", productPhoto.photo.contentType);
      return res.status(200).send(productPhoto.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting product photo",
      error,
    });
  }
};

const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.id).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product ",
      error,
    });
  }
};

const updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    //validation
    switch (true) {
      case !category:
        return res
          .status(200)
          .send({ success: false, message: "Category is required" });

      case photo && photo.size > 1000000:
        return res.status(200).send({
          success: false,
          message: "Photo Must be less than 1mb",
        });
      case !name:
        return res
          .status(200)
          .send({ success: false, message: "Name is required" });
      case !price:
        return res
          .status(200)
          .send({ success: false, message: "Price is required" });
      case !quantity:
        return res
          .status(200)
          .send({ success: false, message: "Quantity is required" });
      case !description:
        return res
          .status(200)
          .send({ success: false, message: "Description is required" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
      await products.save();
      res.status(201).send({
        success: true,
        message: "Product Updated Successfully",
        products,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating product",
      error,
    });
  }
};

module.exports = {
  createProductController,
  getProductController,
  getSingleProductController,
  getProductPhotoController,
  deleteProductController,
  updateProductController,
};
