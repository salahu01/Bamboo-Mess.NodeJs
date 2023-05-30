import employees_model from "../model/employees_schema";

var getAllEmployees = async (_req: any, res: any) => {
    try {
        const employees = await employees_model.find();
        res.json({
            success: true,
            message: "Successfully found employees",
            data: employees,
        });
    } catch (error) {
        res.status(404).json({ success: false, message: "Something went worng !", data: error });
    }
};

var createEmployee = async (req: any, res: any) => {
    try {
        const response = await employees_model.create({ name: req.body.name });
        res.status(201).send({
            success: true,
            message: 'Successfully added employee',
            data: response,
        });
    } catch (error: any) {
        res.status(404).json({ success: false, message: "Something went worng !", data: error.errors });
    }
}; 

var deleteEmployees = async (req: any, res: any) => {
    try {
        const ids:Array<any> = req.body.ids;
        const product = await employees_model.deleteMany({_id:ids});
        res.status(204).send({
            success: true,
            message: 'Successfully removed employee',
            data: product,
        });
    } catch (error: any) {
        res.status(404).json({ success: false, message: "Something went worng !", data: error.errors });
    }
};

var deleteEmployee = async (req: any, res: any) => {
    try {
        const _id = req.params.id;
        const product = await employees_model.deleteOne({ _id });
        res.status(204).send({
            success: true,
            message: 'Successfully removed employee',
            data: product,
        });
    } catch (error: any) {
        res.status(404).json({ success: false, message: "Something went worng !", data: error.errors });
    }
};

export = { getAllEmployees , createEmployee , deleteEmployee , deleteEmployees }