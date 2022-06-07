import AdminModel from '../models/adminModel.js';
import PatientModel from '../models/PatientModel.js';
import DoctorModel from '../models/DoctorModel.js';
import createID from '../helpers/createID.js';

const registerDoctor = async (req, res) => {
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
        return res.json({
            msg: 'The email, emploeeId or citizenshipCard is already in use',
        });
    }
    try {
        const doctor = new DoctorModel(req.body);
        doctor.token = createID();
        const result = await doctor.save();
        res.json(result);
    } catch (error) {
        console.log(`Error creating doctor  ${error}`);
    }
}
export {
    registerDoctor
}