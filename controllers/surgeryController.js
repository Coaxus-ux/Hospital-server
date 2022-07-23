import SurgeryModel from "../models/surgeryModel.js";
const createSurgery = async (req, res) => {

  const { surgeryName } = req.body;
  const surgery = await SurgeryModel.findOne({ surgeryName });
  
  if (surgery) {
    return res.json({
      state: false,
      msg: "Ya existe una cirugía con ese nombre",
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
export { createSurgery,getSurgeries };
