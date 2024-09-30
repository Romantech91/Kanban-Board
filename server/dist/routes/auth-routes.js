import { Router } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Finds user by username
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed: User not found' });
        }
        // Validates password
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).json({ message: 'Authentication failed: Incorrect password' });
        }
        // Gets the JWT secret key from the environment variable
        const secretKey = process.env.JWT_SECRET_KEY;
        if (!secretKey) {
            return res.status(500).json({ message: 'JWT secret key is not defined' });
        }
        // Signs the token with relevant user information
        const token = jwt.sign({ id: user.id, username: user.username, password: user.password }, secretKey, { expiresIn: '1h' });
        // Return the generated token
        return res.json({ token });
    }
    catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
const router = Router();
// POST /login - Login a user
router.post('/login', login);
export default router;
