import { User } from '../models/user.model.js';

export const authMiddleware = async (req, res, next) => {
    try {
        const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
        const [email, password] = Buffer.from(b64auth, 'base64')
            .toString()
            .split(':');

        if (!email || !password) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isValidPassword = await user.isValidPassword(password);
        
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
};
