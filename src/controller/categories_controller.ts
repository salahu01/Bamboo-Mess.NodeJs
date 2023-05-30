import categories_model from "../model/categories_schema";
import products_model from "../model/products_schema";

const getAllCategories = async (_req: any, _res: any) => {
    try {
        const categories = await categories_model.find();
        const products = await products_model.find();
        categories.map(e => e.products = products.filter((_e) => _e.categary_name === e.categary_name));
        _res.json({
            success: true,
            message: "Successfully found categories",
            data: categories,
        });
    } catch (error) {
        _res.status(404).json({ success: false, message: "Something went worng !", data: error });
    }
};

const getOneCategory = async (req: any, res: any) => {
    try {
        const _id = req.params.id;
        const category = await categories_model.findOne({ _id });
        if (category) {
            const products = await products_model.find();
            category.products = products.filter((e) => e.categary_name === category.categary_name)
            res.json({
                success: true,
                message: "Successfully found category",
                data: category,
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Notfound category",
                data: {},
            });
        }
    } catch (error) {
        res.status(404).json({ success: false, message: "Something went worng !", data: error });
    }
}

const createCategory = async (req: any, res: any) => {
    try {
        const category = await categories_model.create({
            categary_name: req.body.categary_name,
            products: []
        });
        res.json({
            success: true,
            message: "Successfully created category",
            data: category,
        });
    } catch (error) {
        res.status(404).json({ success: false, message: "Something went worng !", data: error });
    }
}

const deleteCategory = async (req: any, res: any) => {
    try {
        const _id = req.params.id;
        const category = await categories_model.findOne({ _id });
        if (category) {
            const products = await products_model.find({ categary_name: category.categary_name });
            if (products) {
                res.status(400).json({
                    success: false,
                    message: "Can't delete category . Please remove items from this category ",
                    data: {},
                });
            } else {
                categories_model.deleteOne({ _id })
                res.json({
                    success: true,
                    message: "Successfully deleted category",
                    data: category,
                });
            }

        } else {
            res.status(404).json({
                success: false,
                message: "Notfound category",
                data: {},
            });
        }
    } catch (error) {
        res.status(404).json({ success: false, message: "Something went worng !", data: error });
    }
}

export = { getAllCategories, getOneCategory, createCategory, deleteCategory }