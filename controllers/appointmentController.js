import Appointment from '../models/appointmentModel.js';
const createAppointment = async (req, res) => {
    if(!req.body.patientId || !req.body.doctorId || !req.body.date){
        return res.json({
            state: false,
            msg: "Faltan datos"
        });
    }
    try{
        const appointment = new Appointment(req.body);
        const result = await appointment.save();
        res.json({
            state: true,
            result: result
        });
    }catch (error){
        console.log(`Error creating appointment ${error}`);
    }
    
};
export {
    createAppointment
}