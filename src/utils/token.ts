import jwt from 'jsonwebtoken';
import Student from '../resources/student/student.interface';
import Token from '../utils/interfaces/token.interface';

const secret = "test";
export const createToken = (user: Student): string => {
    return jwt.sign({ id: user._id }, secret as jwt.Secret, {
        expiresIn: '1d',
    });
};

export const verifyToken = async (
    token: string
): Promise<jwt.VerifyErrors | Token> => {
    return new Promise((resolve, reject) => {
        jwt.verify(
            token,
            process.env.JWT_SECRET as jwt.Secret,
            (err, payload) => {
                if (err) return reject(err);

                resolve(payload as Token);
            }
        );
    });
};

export default { createToken, verifyToken };