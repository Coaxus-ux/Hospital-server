import Appointment from "../models/appointmentModel.js";
import DoctorModel from "../models/DoctorModel.js";
import PatientModel from "../models/PatientModel.js";
import SurgeryModel from "../models/surgeryModel.js";
import DepartmentModel from "../models/DepartmentModel.js";
const createAppointment = async (req, res) => {

  if (!req.body.patientId || !req.body.doctorId || !req.body.date) {
    return res.json({
      state: false,
      msg: "Faltan datos",
    });
  }
  try {
    const appointment = new Appointment(req.body);
    const result = await appointment.save();
    res.json({
      state: true,
      result: result,
    });
  } catch (error) {
    console.log(`Error creating appointment ${error}`);
  }
};
const getAppointments = async (req, res) => {
  try {
    const allAppointment = await Appointment.find();
    for (let i = 0; i < allAppointment.length; i++) {
      const doctor = await DoctorModel.findById(allAppointment[i].doctorId);
      const patient = await PatientModel.findById(allAppointment[i].patientId);
      allAppointment[i] = {
        ...allAppointment[i]._doc,
        doctor: doctor.name + " " + doctor.lastName,
        patient: patient.name + " " + patient.lastName,
        patientCitizenshipCard: patient.citizenshipCard,
      };
    }
    res.json({
      state: true,
      result: allAppointment,
    });
  } catch (error) {
    console.log(`Error getting appointments ${error}`);
  }
};
const getAppointment = async (req, res) => {
  const { doctorId } = req.body;
  if (!doctorId) {
    return res.json({
      state: false,
      msg: "Faltan datos",
    });
  }
  try {
    const result = await Appointment.find({ doctorId });
    for(let i = 0; i < result.length; i++) {
      const patient = await PatientModel.findById(result[i].patientId);
      const doctor = await DoctorModel.findById(result[i].doctorId);
      result[i] = {
        ...result[i]._doc,
        patient: patient.name + " " + patient.lastName,
        doctor: doctor.name + " " + doctor.lastName,
        patientEmail: patient.email,
        patientPhone: patient.phoneNumber
      }
    }
    res.json({
      state: true,
      result: result,
    });
  } catch (error) {
    console.log(`Error getting appointment ${error}`);
  }
};
const updateAppointment = async (req, res) => {
  const { id, state, date } = req.body;
  if (!id || !state || !date) {
    return res.json({
      state: false,
      msg: "Faltan datos",
    });
  }
  try {
    const result = await Appointment.findByIdAndUpdate(id, {
      state: state,
      date: date,
    });
    res.json({
      state: true,
      result: result,
    });
  } catch (error) {
    console.log(`Error updating appointment ${error}`);
    res.json({
      state: false,
      msg: "Error actualizando cita",
    });
  }
};
const cancelAppointment = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.json({
      state: false,
      msg: "Faltan datos",
    });
  }
  try {
    const result = await Appointment.findByIdAndUpdate(id,{
      state: "Cancelada"
    });
    res.json({
      state: true,
      result: result,
    });
  } catch (error) {
    console.log(`Error canceling appointment ${error}`);
    res.json({
      state: false,
      msg: "Error cancelando cita",
    });
  }
};
const getAppointmentByuser = async (req, res) => {
  const { patientId } = req.body;
  if (!patientId) {
    return res.json({
      state: false,
      msg: "Faltan datos",
    });
  }
  try {
    const result = await Appointment.find({
      patientId: patientId,
      state: "Pendiente"
    } );
    if(result.length === 0) {
      return res.json({
        state: false,
        msg: "No hay citas pendientes",
      });
    }

    for(let i = 0; i < result.length; i++) {
      const patient = await PatientModel.findById(result[i].patientId);
      const doctor = await DoctorModel.findById(result[i].doctorId);
      const surgery = await SurgeryModel.findById(result[i].sugeryId); 
      
      const department = await DepartmentModel.findById(surgery.departmentId); 
      result[i] = {
        ...result[i]._doc,
        patient: patient.name + " " + patient.lastName,
        doctor: doctor.name + " " + doctor.lastName,
        patientEmail: patient.email,
        patientPhone: patient.phoneNumber,
        surgery: surgery.surgeryName,
        department: department.departmentName,
        city: surgery.city,
      }
    }
    res.json({
      state: true,
      result: result,
    });
  } catch (error) {
    console.log(`Error getting appointment ${error}`);
  }
}
const putAppointmentReady = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.json({
      state: false,
      msg: "Faltan datos",
    });
  }
  try {
    const result = await Appointment.findByIdAndUpdate(id,{
      state: "Lista"
    });
    res.json({
      state: true,
      result: result,
    });
  } catch (error) {
    console.log(`Error putting appointment ready ${error}`);
    res.json({
      state: false,
      msg: "Error actualizando cita",
    });
  }
}

export {
  createAppointment,
  getAppointments,
  getAppointment,
  updateAppointment,
  cancelAppointment,
  getAppointmentByuser,
  putAppointmentReady
};
