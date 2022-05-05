const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

module.exports = async (req, res, next) => {

    var token = req.headers['authorization'];

    try {

        await jwt.verify(token, process.env.AUTH_KEY, async (err, decoded) => {

            if (err) throw new Error('Failed to authenticate token');

            const user = await User.findByPk(decoded.userId);

            if (!user) throw new Error('User not found', 404);

            req.user_id = decoded.userId;
            req.email_id = decoded.email;
            req.type = user.type;

            next();
        });

    } catch (err) {
        err.status = 403;
        next(err);
    }

}