import reciepts_model from "../model/reciepts_schema";
import employees_model from "../model/employees_schema";

const getAllReciepts = async (_req: any, _res: any) => {
    try {
        const reciepts = await reciepts_model.find();
        _res.json({
            success: true,
            message: "Successfully found categories",
            data: reciepts,
        });
    } catch (error) {
        _res.status(404).json({ success: false, message: "Something went worng !", data: error });
    }
};

const createReciepts = async (req: any, res: any) => {
    try {
        const employee = await employees_model.find({ name: req.params.employee });
        if (employee) {
            const reciept = await reciepts_model.create({
                employee: req.body.employee,
                products: req.body.products,
            });
            res.json({
                success: true,
                message: "Successfully created reciept",
                data: reciept,
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Notfound employee",
                data: {},
            });
        }
    } catch (error) {
        res.status(404).json({ success: false, message: "Something went worng !", data: error });
    }
}

const deleteReciepts = async (req: any, res: any) => {
    try {
        const _ids: Array<any> = req.body.ids;
        await reciepts_model.deleteMany({ id: _ids });
        res.json({
            success: true,
            message: "Successfully deleted category",
            data: {},
        });
    } catch (error) {
        res.status(404).json({ success: false, message: "Something went worng !", data: error });
    }
}

export = { getAllReciepts, createReciepts, deleteReciepts }