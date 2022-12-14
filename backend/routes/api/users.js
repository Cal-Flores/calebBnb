// /api/users    beginning

const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();

const validateSignup = [
    check("firstName")
        .exists({ checkFalsy: true })
        .isLength({ min: 3 })
        .withMessage("Please provide a first name with at least 3 characters."),
    check("lastName")
        .exists({ checkFalsy: true })
        .isLength({ min: 3 })
        .withMessage("Please provide a last name with at least 3 characters."),
    check("email")
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage("Please provide a valid email."),
    check("username")
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage("Please provide a username with at least 4 characters."),
    check("username").not().isEmail().withMessage("Username cannot be an email."),
    check("password")
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage("Password must be 6 characters or more."),
    handleValidationErrors,
];


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
