import AppointmentDataModel from "../models/AppointmentDataModel.js";
import DoctorModel from "../models/DoctorModel.js";
import PatientModel from "../models/PatientModel.js";
const createAppointmentData = async (req, res) => {
    const { patientId, doctorId, recomendations } = req.body;
    if(!patientId || !doctorId || !recomendations) {
        return res.json({
            state: false,
            msg: "Faltan datos",
          });
    }
    try{
        const appointmentData = new AppointmentDataModel(req.body);
        const result = await appointmentData.save();
        res.json({
            state: true,
            result: "registro creado",
        });
    }catch(error){
        console.log(`Error creating appointment data ${error}`);
    }
}
const getAppointmentData = async (req, res) => {
    const { patientId } = req.body;
    if(!patientId) {
        return res.json({
            state: false,
            msg: "Faltan datos",
          });
    }
    try{
        const result = await AppointmentDataModel.find({ patientId });
        for(let i = 0; i < result.length; i++) {
            const doctor = await DoctorModel.findById(result[i].doctorId);
            const patient = await PatientModel.findById(result[i].patientId);
            result[i] = {
                ...result[i]._doc,
                doctor: doctor.name + " " + doctor.lastName,
                patient: patient.name + " " + patient.lastName,
            }
        }
        res.json({
            state: true,
            result: result,
        });
    }catch(error){
        console.log(`Error getting appointment data ${error}`);
    }
}
export { createAppointmentData, getAppointmentData };