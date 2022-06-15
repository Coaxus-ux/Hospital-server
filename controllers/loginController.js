import AdminModel from '../models/AdminModel.js';
import PatientModel from '../models/PatientModel.js';
import DoctorModel from '../models/DoctorModel.js';
import createJWT from '../helpers/createJWT.js';
import { emailValidator } from '../helpers/emailValidator.js';


const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if(!emailValidator(email)){
        return res.json({
            state: false,
            msg: 'El correo electrónico no es válido'
        });
    }
    // multplie await
    const validation = await Promise.all([
        AdminModel.findOne({ email }),
        PatientModel.findOne({ email }),
        DoctorModel.findOne({ email }),
    ]);
    const user = validation.find(user => user);
    if (!user) {
        return res.json({ msg: 'User not found' });
    }
    if (!user.isConfirmed) {
        return res.json({ msg: 'User not confirmed' });
    }
    if (await user.comparePassword(password)) {
        return res.json({
            _id: user._id,
            name: user.name + ' ' + user.lastName,
            email: user.email,
            userType: user.userType,
            token: createJWT(user._id, user.userType),
        });
    } else {
        return res.json({ msg: 'Password incorrect' });
    }
}
export{
    loginUser
}
