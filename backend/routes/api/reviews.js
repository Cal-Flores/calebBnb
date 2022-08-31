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

//delete a review
router.delete('/:reviewId', requireAuth, restoreUser, async (req, res, next) => {
    const review = await Review.findByPk(req.params.reviewId);
    if (!review) {
        return res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }
    await review.destroy();
    return res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})

//Edit a Review
router.put('/:reviewId', requireAuth, async (req, res, next) => {
    let { review, stars } = req.body
    const editreview = await Review.findByPk(req.params.reviewId);
    if (!editreview) {
        res.status(404)
        return res.json({ "message": "Review couldn't be found" });
    }
    if (!review || !stars) {
        return res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "review": "Review text is required",
                "stars": "Stars must be an integer from 1 to 5",
            }
        })
    }
    editreview.update({
        review: review,
        stars: stars
    })

    return res.json(editreview)
})






//get all reviews of current user
router.get('/current', requireAuth, restoreUser, async (req, res, next) => {
    const currentReviews = await Review.findAll({
        where: {
            userId: req.user.id,
        },
    });
    for (let i = 0; i < currentReviews.length; i++) {
        let review = currentReviews[i];
        // console.log("review``````````````````", review);
        let spot = await review.getSpot();
        let ReviewImages = await review.getReviewImages({
            attributes: ["id", "url"],
        });
        let owner = await review.getUser({
            attributes: ["id", "firstName", "lastName"],
        });
        review.dataValues.Spot = spot.toJSON();
        review.dataValues.ReviewImages = ReviewImages;
        review.dataValues.User = owner.toJSON();
    }
    res.json({ Reviews: currentReviews });
});

// Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, restoreUser, async (req, res, next) => {
    let { url } = req.body;
    const review = await Review.findByPk(req.params.reviewId);
    if (!review) {
        res.status(404)
        return res.json({ "message": "Review couldn't be found" })
    }
    let newImg = ReviewImage.create({
        reviewId: req.params.reviewId,
        url: url,
    })
    return res.json(newImg);
})





















module.exports = router;
