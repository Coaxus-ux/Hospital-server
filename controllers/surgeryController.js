import SurgeryModel from "../models/surgeryModel.js";
import DepartmentModel from "../models/DepartmentModel.js";
const createSurgery = async (req, res) => {

  const { surgeryName } = req.body;
  const surgery = await SurgeryModel.findOne({ surgeryName });
  
  if (surgery) {
    return res.json({
      state: false,
      msg: "Ya existe un consultoria con ese nombre",
    });
  }
  try {
    const surgery = new SurgeryModel(req.body);
    const result = await surgery.save();
    res.json({
      state: true,
      result: result,
    });
  } catch (error) {
    console.log(`Error creating surgery ${error}`);
  }
};
const getSurgeries = async (req, res) => {
    try {
        const surgeries = await SurgeryModel.find({});
        for(let i = 0; i < surgeries.length; i++){
            const department = await DepartmentModel.findById(surgeries[i].departmentId);
            surgeries[i] = {
                ...surgeries[i]._doc,
                departmentName: department.departmentName
            }
        }
        if(surgeries.length === 0){
            return res.json({
                state: false,
                msg: "No hay cirugías registradas"
            })
        }
        res.json({
            state: true,
            result: surgeries,
        });
        
    } catch (error) {
        console.log(`Error getting surgeries ${error}`);
    }
}
const updateSurgery = async (req, res) => {
    const { _id } = req.body;
    if(!_id) {
        return res.json({
            state: false,
            msg: "El id es requerido"
        })
    }
    try {
        const surgery = await SurgeryModel.findByIdAndUpdate(_id, req.body);
        if(!surgery) {
            return res.json({
                state: false,
                msg: "La consultorio no existe"
            })
        }
        res.json({
            state: true,
            result: surgery,
        });
    } catch (error) {
        console.log(`Error updating surgery ${error}`);
    }
}
export { createSurgery,getSurgeries, updateSurgery };
