import UserModel from '../models/userModel.js';
import createID from '../helpers/createID.js';
import createJWT from '../helpers/createJWT.js';

const registerUser = async (req, res) => {
    const { email, emploeeId, citizenshipCard } = req.body;
    // multplie await
    const validations = await Promise.all([
        UserModel.findOne({ email }),
        UserModel.findOne({ emploeeId }),
        UserModel.findOne({ citizenshipCard }),
                    
    ]);
    if (validations.some(validation => validation)) {
        return res.status(400).json({
            msg: 'The email, emploeeId or citizenshipCard is already in use',
        });
    }
    try {
        const user = new UserModel(req.body);
        user.token = createID();
        const result = await user.save();
        res.json(result);
    } catch (error) {
        console.log(`Error creating user ${error}`);
    }
}
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
        return res.json({ msg: 'User not found' });
    }
    if (!user.isConfirmed) {
        return res.json({ msg: 'User not confirmed' });
    }
    if (await user.comparePassword(password)) {
        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: createJWT(user._id),
        });
    } else {
        return res.json({ msg: 'Password incorrect' });
    }
}
export {
    registerUser,
    loginUser
}