import AdminModel from '../models/adminModel.js';
import UserModel from '../models/userModel.js';
import createID from '../helpers/createID.js';
import createJWT from '../helpers/createJWT.js';

const registerAdmin = async (req, res) => {
    const { email, emploeeId, citizenshipCard } = req.body;
    // multplie await
    const validations = await Promise.all([
        AdminModel.findOne({ email }),
        AdminModel.findOne({ emploeeId }),
        AdminModel.findOne({ citizenshipCard }),
        
        UserModel.findOne({ email }),
        UserModel.findOne({ emploeeId }),
        UserModel.findOne({ citizenshipCard })
    ]);
    if (validations.some(validation => validation)) {
        return res.status(400).json({
            msg: 'The email, emploeeId or citizenshipCard is already in use',
        });
    }
    try {
        const user = new AdminModel(req.body);
        user.token = createID();
        const result = await user.save();
        res.json(result);
    } catch (error) {
        console.log(`Error creating administrator  ${error}`);
    }
}
export {
    registerAdmin
}