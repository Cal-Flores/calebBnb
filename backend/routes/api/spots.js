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



// /api/spots

//Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, restoreUser, async (req, res, next) => {
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
                    { startDate: { [Op.gte]: req.body.startDate } },
                    { endDate: { [Op.lte]: req.body.endDate } },
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
        endDate: req.body.endDate
    });
    return res.json(newBooking);
});

//add an image to a spot
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const { url, preview } = req.body;
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
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
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
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

// attributes: [[sequelize.fn('min', sequelize.col('price')), 'minPrice']],
//   });


//get all spots from a current user
router.get('/current', requireAuth, async (req, res, next) => {
    const current = req.user.id;
    const spots = await Spot.findAll({
        where: {
            ownerId: current
        }
    })

    for (let spot of spots) {
        const starts = await Review.findAll({
            where: {
                spotId: spot.id
            },
            attributes: [[Sequelize.fn('AVG', Sequelize.col('stars')), 'avgRating']]
        })
        let avgRating = starts[0].dataValues.avgRating;
        spot.dataValues.avgRating = Number(avgRating).toFixed(1);

        let previewImage = await SpotImage.findOne({
            where: {
                spotId: spot.id
            }
        })
        if (previewImage) {
            spot.dataValues.previewImage = previewImage.dataValues.url;
        }
    }


    return res.json({ spots });
});

// post a new spot
router.post('/', requireAuth, async (req, res, next) => {
    let { address, city, state, country, lat, lng, name, description, price, image, imageTwo, imageThree } = req.body;
    const newSpot = await Spot.create({ ownerId: req.user.id, address, city, state, country, lat, lng, name, description, price, image, imageTwo, imageThree })
    return res.json(newSpot);

})

//delete a spot
router.delete('/:spotId', requireAuth, restoreUser, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    }
    await spot.destroy();
    return res.json({ "message": "Successfully deleted" });
})

//update an existing spot
router.put('/:spotId', requireAuth, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price, image, imageTwo, imageThree } = req.body;
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    }
    const updatespot = await spot.update({ address, city, state, country, lat, lng, name, description, price, image, imageTwo, imageThree });
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
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
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
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } =
        req.query;
    let pagination = { options: [] };

    page = parseInt(page);
    size = parseInt(size);

    if (Number.isNaN(page)) {
        page = 1;
    }
    if (Number.isNaN(size)) {
        size = 20;
    }

    pagination.limit = size;
    pagination.offset = size * (page - 1);




    if (minLat) {
        pagination.options.push({
            lat: { [Op.gte]: Number(minLat) },
        });
    }

    if (maxLat) {
        pagination.options.push({
            lat: { [Op.lte]: Number(maxLat) },
        });
    }

    if (minLng) {
        pagination.options.push({
            lng: { [Op.gte]: Number(minLng) },
        });
    }

    if (maxLng) {
        pagination.options.push({
            lat: { [Op.lte]: Number(maxLng) },
        });
    }

    if (minPrice) {
        pagination.options.push({
            price: { [Op.gte]: Number(minPrice) },
        });
    }

    if (maxPrice) {
        pagination.options.push({
            price: { [Op.lte]: Number(maxPrice) },
        });
    }

    const spots = await Spot.findAll({
        where: {
            [Op.and]: pagination.options,
        },
        limit: pagination.limit,
        offset: pagination.offset,
    });


    for (let spot of spots) {
        const stars = await spot.getReviews({
            attributes: [[Sequelize.fn('AVG', Sequelize.col('stars')), 'avgRating']]
        })
        let avgRating = stars[0].dataValues.avgRating;

        spot.dataValues.avgRating = Number(avgRating).toFixed(1);

        const previewImg = await SpotImage.findOne({
            where: {
                spotId: spot.id
            }
        })
        if (previewImg) {
            spot.dataValues.previewImage = previewImg.dataValues.url
        }
    }
    return res.json({ spots: spots, page, size });
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
    res.json({ Reviews: reviews });
});


router.get("/:spotId/bookings", requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId, {
        where: { ownerId: req.user.id },
        attributes: ["ownerId"],
    })


    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404,
        });
    }
    // all bookings if the spot does not belong to current user
    const allBookings = await Booking.findAll({
        where: { spotId: req.params.spotId },
        attributes: ["spotId", "startDate", "endDate"],
    });


    // booking for the owner
    const ownerBookings = await Booking.findAll({
        where: { spotId: req.params.spotId },
        include: {
            model: User,
            attributes: ["id", "firstName", "lastName"],
        },
    });

    if (spot.ownerId === req.user.id) {
        return res.json({ Bookings: ownerBookings });
    } else {
        return res.json({ Bookings: allBookings });
    }
}
);




module.exports = router;
