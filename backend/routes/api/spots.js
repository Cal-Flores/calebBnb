const express = require("express");
const {
    setTokenCookie,
    restoreUser,
    requireAuth,
    authenticate,
} = require('../../utils/auth');
const { User, Spot, Image, Review, Booking, SpotImage, ReviewImage } = require('../../db/models');
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

//Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, restoreUser, validateBooking, async (req, res, next) => {
    const spotId = parseInt(req.params.spotId);
    const userId = parseInt(req.user.id);
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404,
        });
    }
    const bookings = await Booking.findAll({
        where: {
            spotId: spotId,
            [Op.and]:
                [
                    { startDate: { [Op.lte]: req.body.startDate } },
                    { endDate: { [Op.gte]: req.body.endDate } },
                ],
        },
    });
    if (bookings.length >= 1) {
        res.status(403);
        return res.json({
            message: "Sorry, this spot is already booked for the specified dates",
            statusCode: 403,
            errors: {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking",
            },
        });
    }
    const newBooking = await Booking.create({
        spotId: spotId,
        userId: userId,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        // updatedAt: new Date(),
    });
    // console.log('newbooking``````````````',newBooking)
    // await newBooking.save();
    res.json(newBooking);
});

//add an image to a spot
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const { url, preview } = req.body;
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        res.status(404)
        return res.json({ "message": "Spot couldn't be found" })
    }
    const newImg = await SpotImage.create({
        spotId: req.params.spotId,
        url: url,
        preview: preview
    })
    return res.json({
        id: newImg.spotId,
        url: newImg.url,
        preview: newImg.preview,
    });

})

// post a review for spot based on spot id
router.post('/:spotId/reviews', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        res.status(404)
        return res.json({ "message": "Spot couldn't be found" })
    }
    if (!req.body.review || !req.body.stars) {
        res.status(400);
        return res.json({
            message: "Validation error",
            statusCode: 400,
            errors: {
                review: "Review text is required",
                stars: "Stars must be an integer from 1 to 5",
            },
        });
    }

    const totalReviews = await Review.findAll({
        where: {
            [Op.and]: [{ userId: req.user.id }, { spotId: req.params.spotId }],
        },
    });
    if (totalReviews.length >= 1) {
        res.status(403);
        return res.json({
            message: "User already has a review for this spot",
            statusCode: 403,
        });
    }
    const newReview = await Review.create({
        userId: req.user.id,
        spotId: req.params.spotId,
        review: req.body.review,
        stars: req.body.stars,
    });
    res.status(201);
    res.json(newReview);
})



//get all spots from a current user
router.get('/current', requireAuth, async (req, res, next) => {
    const current = req.user.id;
    console.log(current);
    console.log('hi')
    const spots = await Spot.findAll({
        where: {
            ownerId: current
        }
    })
    return res.json({ spots });
});

// post a new spot
router.post('/', requireAuth, validateSpot, async (req, res, next) => {
    let { address, city, state, country, lat, lng, name, description, price } = req.body;
    const newSpot = await Spot.create({ ownerId: req.user.id, address, city, state, country, lat, lng, name, description, price })
    return res.json(newSpot);

})

//delete a spot
router.delete('/:spotId', requireAuth, restoreUser, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        res.status(404)
        return res.json({ "message": "Spot couldn't be found" });
    }
    await spot.destroy();
    return res.json({ "message": "Successfully deleted" });
})

//update an existing spot
router.put('/:spotId', requireAuth, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        res.status(404)
        return res.json({ "message": "Spot couldn't be found" });
    }
    const updatespot = await spot.update({ address, city, state, country, lat, lng, name, description, price });
    return res.json(updatespot);
})

//Get details of a Spot from an id
router.get('/:spotId', async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId, {
        include: [
            { model: SpotImage, attributes: ['id', 'url', 'preview'] },
            { model: User, as: 'Owner', attributes: ['id', 'firstName', 'lastName'] }
        ]
    });
    if (!spot) {
        res.status(404)
        return res.json({ "message": "Spot couldn't be found" })
    }
    const countReview = await Spot.findByPk(req.params.spotId, {
        include: {
            model: Review,
            attributes: [],
        },
        attributes: [
            [Sequelize.fn("COUNT", Sequelize.col("review")), "numReviews"],
            [Sequelize.fn("AVG", Sequelize.col("stars")), "avgStarRating"],
        ],
        raw: true,
    });
    let currentSpotJSON = spot.toJSON();
    currentSpotJSON.numReviews = countReview.numReviews;
    const rating = countReview.avgStarRating;
    currentSpotJSON.avgStarRating = Number(rating).toFixed(1);
    res.json(currentSpotJSON);
});

//get all spots
router.get('/', async (req, res, next) => {
    const spots = await Spot.findAll();
    return res.json({ spots });
});

//still need avgrating and preview image////



//get all reviews by spot id
router.get('/:spotId/reviews', restoreUser, async (req, res, next) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404,
        });
    }
    const reviews = await Review.findAll({
        where: {
            spotId: spotId,
        },
        include: [
            { model: User, attributes: ["id", "firstName", "lastName"] },
            { model: ReviewImage, attributes: ["id", "url"] },
        ],
    });
    const images = await ReviewImage.findAll({
        where: {
            reviewId: spotId,
        },
    });
    // for (let review of reviews) {
    //   review.Images = images;
    // }
    res.json({ Reviews: reviews });
});


router.get("/:spotId/bookings", requireAuth, restoreUser, async (req, res, next) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404,
        });
    }
    const bookings = await Booking.findAll({
        include: { model: User, attributes: ["id", "firstName", "lastName"] },
        where: {
            spotId: spotId,
        },
    });

    res.json({ bookings });
}
);




module.exports = router;
