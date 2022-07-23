import Appointment from "../models/appointmentModel.js";
import DoctorModel from "../models/DoctorModel.js";
import PatientModel from "../models/PatientModel.js";
const createAppointment = async (req, res) => {
  console.log(req.body);
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
    const result = await Appointment.find({doctorId});
    
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
  console.log(id, state, date);
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
const deleteAppointment = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.json({
      state: false,
      msg: "Faltan datos",
    });
  }
  try {
    const result = await Appointment.findByIdAndDelete(id);
    res.json({
      state: true,
      result: result,
    });
  } catch (error) {
    console.log(`Error deleting appointment ${error}`);
  }
};

export {
  createAppointment,
  getAppointments,
  getAppointment,
  updateAppointment,
  deleteAppointment,
};
