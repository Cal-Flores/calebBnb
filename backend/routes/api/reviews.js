const express = require('express');
const { setTokenCookie,
    restoreUser,
    requireAuth,
    authenticate,
} = require('../../utils/auth');
const { sequelize } = require('sequelize');
const { op } = require('sequelize');
const { User, Spot, Booking, Review, ReviewImage, SpotImage } = require('../../db/models');
const router = express.Router();

//validations for use
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const validateReview = [
    check("review")
        .exists({ checkFalsy: true })
        .withMessage("Review is required"),
    check("stars").exists({ checkFalsy: true }).withMessage("Rating is required"),
    handleValidationErrors,
];

router.get('/current', requireAuth, restoreUser, async (req, res, next) => {
    const current = req.user.id
    const reviews = await Review.findAll({
        where: {
            userId: current
        },
        include: [User]
    })
    return res.json({ reviews });
})























module.exports = router;
