import jwt from 'jsonwebtoken';

const createJWT = (id, userType) => {
    return jwt.sign({ id: id, userType: userType}, process.env.JWT_SECRET, { 
        expiresIn: '30d'
    });
}
export default createJWT;