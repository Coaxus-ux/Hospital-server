import DepartmentModel from "../models/DepartmentModel.js";
const getDepartments = async (req, res) => {
  try {
    const departments = await DepartmentModel.find();
    res.json({
      state: true,
      result: departments,
    });
  } catch (error) {
    console.log(`Error getting departments ${error}`);
  }
};
export { getDepartments };
