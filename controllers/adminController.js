import AdminModel from '../models/adminModel.js';
import PatientModel from '../models/PatientModel.js';
import DoctorModel from '../models/DoctorModel.js';
import createID from '../helpers/createID.js';

const registerAdmin = async (req, res) => {
    const { email, emploeeId, citizenshipCard } = req.body;
    // multplie await
    const validations = await Promise.all([
        AdminModel.findOne({ email }),
        AdminModel.findOne({ emploeeId }),
        AdminModel.findOne({ citizenshipCard }),

        PatientModel.findOne({ email }),
        PatientModel.findOne({ citizenshipCard }),

        DoctorModel.findOne({ email }),
        DoctorModel.findOne({ emploeeId }),
        DoctorModel.findOne({ citizenshipCard })
    ]);
    if (validations.some(validation => validation)) {
        return res.status(400).json({
            msg: 'The email, emploeeId or citizenshipCard is already in use',
        });
    }
    try {
        const admin = new AdminModel(req.body);
        admin.token = createID();
        const result = await admin.save();
        res.json(result);
    } catch (error) {
        console.log(`Error creating administrator  ${error}`);
    }
}
export {
    registerAdmin
}