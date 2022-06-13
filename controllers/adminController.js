import AdminModel from "../models/AdminModel.js";
import createID from "../helpers/createID.js";
import { sendEmail } from "../helpers/emailSender.js";
import { emailValidator } from "../helpers/emailValidator.js";
import validator from "../helpers/validatorUnique.js";
const registerAdmin = async (req, res) => {
  const { email, emploeeId, citizenshipCard } = req.body;
  // multplie await
  if (!emailValidator(email)) {
    return res.json({
      state: false,
      msg: "El correo electrónico no es válido",
    });
  }
  const validation = await validator(email, emploeeId, citizenshipCard);
  console.log(validation);
  if (!validation.state) {
    return res.json(validation.msg);
  }
  try {
    const admin = new AdminModel(req.body);
    admin.token = createID();
    const result = await admin.save();
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
    console.log(`Error creating administrator  ${error}`);
  }
};
export { registerAdmin };
