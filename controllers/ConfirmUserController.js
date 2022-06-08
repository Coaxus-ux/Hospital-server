import AdminModel from '../models/adminModel.js';
import PatientModel from '../models/PatientModel.js';
import DoctorModel from '../models/DoctorModel.js';

const confirm = async (req, res) => {
    const { token } = req.params;
    const validationToken = await Promise.all([
        AdminModel.findOne({ token }),
        PatientModel.findOne({ token }),
        DoctorModel.findOne({ token }),
    ]);
    const userConfirm = validationToken.find(user => user);
    if (!userConfirm) {
      const error = new Error("Token no válido");
      return res.json({ msg: error.message });
    }
  
    try {
      userConfirm.isConfirmed = true;
      userConfirm.token = "";
      await userConfirm.save();
      res.json({ msg: "Usuario Confirmado Correctamente" });
    } catch (error) {
      console.log(error);
    }
  };
export {
    confirm
};