import PatientModel from "../models/PatientModel.js";
import createID from "../helpers/createID.js";
import { sendEmail } from "../helpers/emailSender.js";
import { emailValidator } from "../helpers/emailValidator.js";
import validator from "../helpers/validatorUnique.js";

const registerPatient = async (req, res) => {
  const { email, citizenshipCard } = req.body;
  await delete req.body.emploeeId;
  if (!emailValidator(email)) {
    return res.json({
      state: false,
      msg: "El correo electrónico no es válido",
    });
  }
  const validation = await validator(email, false, citizenshipCard);
  console.log(validation);
  if (!validation.state) {
    return res.json(validation.msg);
  }
  try {
    const patient = new PatientModel(req.body);
    patient.token = createID();
    const result = await patient.save();
    sendEmail({
      email: result.email,
      name: result.name,
      token: result.token,
    });
    res.json({
      state: true,
      result: result,
    });
  } catch (error) {
    console.log(`Error creating patient ${error}`);
  }
};

export { registerPatient };
