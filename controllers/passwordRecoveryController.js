import AdminModel from '../models/AdminModel.js';
import PatientModel from '../models/PatientModel.js';
import DoctorModel from '../models/DoctorModel.js';
import { passwordRecoveryEmail } from '../helpers/emailSender.js';
import createID from '../helpers/createID.js';

const passwordRecovery = async (req, res) => {
  const { email } = req.body;
  const validation = await Promise.all([
    AdminModel.findOne({ email }),
    PatientModel.findOne({ email }),
    DoctorModel.findOne({ email }),
  ]);
  const user = validation.find((user) => user);
  if (!user) {
    return res.json({
      state: false,
      msg: "Usuario no encontrado",
    });
  }
  if (!user.isConfirmed) {
    return res.json({
      state: false,
      msg: "Usuario no confirmado",
    });
  }
  try {
    user.token = createID();
    await user.save();
    passwordRecoveryEmail({
      email: user.email,
      name: user.name,
      token: user.token,
    });
    res.json({
      state: true,
      msg: "Email enviado",
    });
  } catch (error) {
    console.log(error);
  }
};
const newPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    const user = await Promise.all([
        AdminModel.findOne({ token }),
        PatientModel.findOne({ token }),
        DoctorModel.findOne({ token }),
    ]);
    const userFound = user.find((user) => user);
    if (!userFound) {
        return res.json({
            state: false,
            msg: "Usuario no encontrado",
        });
    }
    userFound.password = password;
    userFound.token = "";
    try {
        await userFound.save();
        res.json({
            state: true,
            msg: "Contraseña actualizada",
        });
    }
    catch (error) {
        res.json({
            state: false,
            msg: "Fallo al actualizar contraseña",
        });
        console.log(error);
    }
};
export { passwordRecovery, newPassword };
