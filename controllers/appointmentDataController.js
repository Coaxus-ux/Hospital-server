import AppointmentDataModel from "../models/AppointmentDataModel.js";
const createAppointmentData = (req, res) => {
    const { patientId, doctorId, recomendations } = req.body;
    if(!patientId || !doctorId || !recomendations) {
        return res.json({
            state: false,
            msg: "Faltan datos",
          });
    }
    try{
        const appointmentData = new AppointmentDataModel(req.body);
        const result = appointmentData.save();
        res.json({
            state: true,
            result: "registro creado",
        });
    }catch(error){
        console.log(`Error creating appointment data ${error}`);
    }
}
const getAppointmentData = (req, res) => {
    const { patientId } = req.body;
    if(!patientId) {
        return res.json({
            state: false,
            msg: "Faltan datos",
          });
    }
    try{
        const result = AppointmentDataModel.find({ patientId });
        res.json({
            state: true,
            result: result,
        });
    }catch(error){
        console.log(`Error getting appointment data ${error}`);
    }
}
export { createAppointmentData, getAppointmentData };