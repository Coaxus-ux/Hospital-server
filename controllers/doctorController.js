import DoctorModel from "../models/DoctorModel.js";
import createID from "../helpers/createID.js";
import { registerEmail } from "../helpers/emailSender.js";
import { emailValidator } from "../helpers/emailValidator.js";
import validator from "../helpers/validatorUnique.js";
const registerDoctor = async (req, res) => {
  const { email, emploeeId, citizenshipCard } = req.body;
  if (!emailValidator(email)) {
    return res.json({
      state: false,
      msg: "El correo electrónico no es válido",
    });
  }
  const validation = await validator(email, emploeeId, citizenshipCard);
  if (!validation.state) {
    return res.json(validation.msg);
  }
  try {
    const doctor = new DoctorModel(req.body);
    doctor.token = createID();
    const result = await doctor.save();
    registerEmail({
      email: result.email,
      name: result.name,
      token: result.token,
    });
    res.json({
      state: true,
      result: result,
    });
  } catch (error) {
    console.log(`Error creating doctor  ${error}`);
  }
};
const getDoctors = async (req, res) => {
  try {
    const doctors = await DoctorModel.find({});
    res.json({
      state: true,
      result: doctors,
    });
  } catch (error) {
    console.log(`Error getting doctors  ${error}`);
  }
}
const getDoctorsById = async (req, res) => {
  const { id } = req.body;
  if(!id) {
    return res.json({
      state: false,
      msg: "El id es requerido"
    })
  }
  try {
    const doctor = await DoctorModel.findById(id);
    if(!doctor) {
      return res.json({
        state: false,
        msg: "El doctor no existe"
      })
    }
    res.json({
      state: true,
      result: doctor,
    });
  } catch (error) {
    console.log(`Error getting doctor  ${error}`);
  }
}
export { registerDoctor, getDoctors, getDoctorsById };
