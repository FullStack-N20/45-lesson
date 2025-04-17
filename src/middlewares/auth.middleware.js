const defaultAdmin = { login: 'admin', password: 'qwert1234' };

export const authMiddleware = (req, res, next) => {
    try {
        const b64auth = (req.headers.authorization || '').split(' ')[1] || '';

        const {login, password} = Buffer.from(b64auth, 'base64')
            .toString()
            .split(':');

        if (
            login &&
            password &&
            login === defaultAdmin.login &&
            password === defaultAdmin.password
        ) {
            res.send('Access granted');
        }

        res.status(401).send('Authentication required.');
    } catch (err) {
        next(err)
    }
};
