import products_model from "../model/products_schema";
import categories_model from "../model/categories_schema";

var getAllProducts = async (_req: any, res: any) => {
  try {
    const products = await products_model.find();
    res.json({
      success: true,
      message: "Successfully found products",
      data: products,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "Something went worng !", data: error });
  }
};

var createOneProduct = async (req: any, res: any) => {
  try {
    const response = await products_model.create(req.body);
    const category = await categories_model.findOne({
      categary_name: req.body.categary_name,
    });
    if (category) {
      category.products.push(response.id)
      await category.save();
    } else {
      await categories_model.create({
        products: [response.id],
        categary_name: response.categary_name,
      });
    }
    res.status(201).send({
      success: true,
      message: 'Product created successfully',
      data: response,
    });
  } catch (error: any) {
    res.status(404).json({ success: false, message: "Something went worng !", data: error.errors });
  }
};

var getOneProduct = async (req: any, res: any) => {
  try {
    const _id = req.params.id;
    const product = await products_model.findOne({ _id });
    res.status(200).send({
      success: true,
      message: 'Successfully found product',
      data: product,
    });
  } catch (error: any) {
    res.status(404).json({ success: false, message: "Something went worng !", data: error.errors });
  }
};

var patchOneProduct = async (req: any, res: any) => {
  try {
    const _id = req.params.id;
    const product = await products_model.updateOne({ _id }, { $set: req.body });
    res.status(200).send({
      success: true,
      message: 'Successfully product updated',
      data: product,
    });
  } catch (error: any) {
    res.status(404).json({ success: false, message: "Something went worng !", data: error.errors });
  }
};

var deleteOneProduct = async (req: any, res: any) => {
  try {
    const _id = req.params.id;
    const product = await products_model.deleteOne({ _id });
    res.status(204).send({
      success: true,
      message: 'Successfully product deleted',
      data: product,
    });
  } catch (error: any) {
    res.status(404).json({ success: false, message: "Something went worng !", data: error.errors });
  }
};

export = { getAllProducts, createOneProduct, getOneProduct, patchOneProduct, deleteOneProduct }