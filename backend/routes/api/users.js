// /api/users    beginning

const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


//sign up a new user
router.post('/', validateSignup, async (req, res) => {
    const { firstName, lastName, email, password, username } = req.body;

    const emailCheck = await User.findAll({ where: { email: email } });
    if (emailCheck.length) {
        const err = {};
        err.message = "User already exists";
        err.status = 403;
        err.errors = {
            email: "User with that email already exists",
        };
        return res.json(err);
    }

    const usernameCheck = await User.findAll({
        where: { username: username },
    });
    if (usernameCheck.length) {
        const err = {};
        err.message = "User already exists";
        err.status = 403;
        err.errors = {
            email: "User with that username already exists",
        };
        return res.json(err);
    }

    const user = await User.signup({ firstName, lastName, email, username, password });

    await setTokenCookie(res, user);

    return res.json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        token: ''
    });
}
);













module.exports = router;
