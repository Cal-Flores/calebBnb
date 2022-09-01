const express = require('express');
const {
    setTokenCookie,
    restoreUser,
    requireAuth,
    authenticate,
} = require('../../utils/auth');
const { Op } = require("sequelize");
const { User, Spot, Image, Review, Booking } = require("../../db/models");
const { Sequelize } = require("sequelize");
const router = express.Router();


const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const validateReview = [
    check("review")
        .exists({ checkFalsy: true })
        .withMessage("Review is required"),
    check("stars").exists({ checkFalsy: true }).withMessage("Rating is required"),
    handleValidationErrors,
];
const validateSpot = [
    check("address")
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Street address is required"),
    check("city").exists({ checkFalsy: true }).withMessage("City is required"),
    check("state").exists({ checkFalsy: true }).withMessage("State is required"),
    check("country")
        .exists({ checkFalsy: true })
        .withMessage("Country is required"),
    check("lat").isDecimal().withMessage("Latitude is not valid"),
    check("lng").isDecimal().withMessage("Longitude is not valid"),
    check("name")
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage("Name must be less than 50 characters"),
    check("description")
        .exists({ checkFalsy: true })
        .withMessage("Description is required"),
    check("price")
        .exists({ checkFalsy: true })
        .withMessage("Price per day is required"),
    handleValidationErrors,
];

const validateBooking = [
    check("startDate")
        .exists({ checkFalsy: true })
        .isDate()
        .notEmpty()
        // .custom((value)=>{

        // }
        // )
        .withMessage(
            "startDate cannot be empty. Cannot be greater than endDate. Format is YYYY-MM-DD"
        ),
    check("endDate")
        .exists({ checkFalsy: true })
        .isDate()
        .notEmpty()
        .withMessage("endDate cannot be empty. Format is YYYY-MM-DD"),
    handleValidationErrors,
];

//Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res, next) => {
    const bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: {
            model: Spot, attributes: [
                "id",
                "ownerId",
                "address",
                "city",
                "state",
                "country",
                "lat",
                "lng",
                "name",
                "price",
            ],
        }
    })
    const result = [];
    for (let booking of bookings) {
        // console.log("this is booking ````", booking);
        booking = booking.toJSON();
        result.push(booking);
    }
    res.json({ Bookings: result });
});


router.put('/:bookingId', requireAuth, restoreUser, validateBooking, async (req, res, next) => {
    const { startDate, endDate } = req.body;
    const booking = await Booking.findByPk(req.params.bookingId);
    if (!booking) {
        return res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        })
    }
    const updatedBooking = await booking.update({
        startDate: startDate,
        endDate: endDate,
    })
    return res.json(updatedBooking);
})


router.delete('/:bookingId', requireAuth, restoreUser, async (req, res, next) => {
    const booking = await Booking.findByPk(req.params.bookingId);
    if (!booking) {
        return res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        })
    }
    await booking.destroy();
    return res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})








module.exports = router;
