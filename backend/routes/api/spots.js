const express = require("express");
const {
    setTokenCookie,
    restoreUser,
    requireAuth,
    authenticate,
} = require('../../utils/auth');
const { User, Spot, Image, Review, Booking } = require('../../db/models');
const { Op } = require("sequelize");
const router = express.Router();
const { Sequelize } = require("sequelize");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

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
    check("lat")
        .isDecimal()
        .withMessage("Latitude is not valid"),
    check("lng")
        .isDecimal()
        .withMessage("Longitude is not valid"),
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

const validateReview = [
    check("review")
        .exists({ checkFalsy: true })
        .withMessage("Review text is required"),
    check("stars")
        .exists({ checkFalsy: true })
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors,
];

const validateBooking = [
    check("startDate")
        .exists({ checkFalsy: true })
        .isDate()
        .notEmpty()
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
const validateQuery = [
    check("page")
        .isInt({ min: 0 }, { max: 10 })
        .optional()
        .withMessage("Page must be greater than or equal to 0"),
    check("size")
        .isInt({ min: 0 }, { max: 20 })
        .optional()
        .withMessage("Size must be greater than or equal to 0"),
    check("minLat")
        .isDecimal()
        .optional()
        .withMessage("Minimum latitude is invalid"),
    check("maxLat")
        .isDecimal()
        .optional()
        .withMessage("Maximum latitude is invalid"),
    check("minLng")
        .isDecimal()
        .optional()
        .withMessage("Minimum longitude is invalid"),
    check("maxLng")
        .isDecimal()
        .optional()
        .withMessage("Maximum longitude is invalid"),
    check("minPrice")
        .isDecimal({ min: 0 })
        .optional()
        .withMessage("Minimum price must be greater than or equal to 0"),
    check("maxPrice")
        .isDecimal({ min: 0 })
        .optional()
        .withMessage("Maximum price must be greater than or equal to 0"),
];


// /api/spots


//get all spots from a current user
router.get('/current', async (req, res, next) => {
    const current = req.user.id;
    console.log(current);
    console.log('hi')
    const spots = await Spot.findAll({
        where: {
            ownerId: current
        }
    })
    return res.json(spots);
});

router.post('/', async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const newSpot = await Spot.create({ address, city, state, country, lat, lng, name, description, price })
    return res.json(newSpot);
})

//Get details of a Spot from an id
router.get('/:spotId', async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        res.status(404)
        return res.json({ "message": "Spot couldn't be found" })
    }
    return res.json(spot);
    //console.log(spot);
});

//get all spots
router.get('/', async (req, res, next) => {
    const spots = await Spot.findAll();
    return res.json(spots);
});










module.exports = router;
