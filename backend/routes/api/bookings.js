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

    // for (let booking of bookings) {
    //     let previewImage = booking.findOne({
    //         where: {
    //             spotId: bookings.Spot.id
    //         }
    //     })
    //     if (previewImage) {
    //         bookings.spotId.datavalues.previewImage = previewImage.datavalues
    //     }
    // }

    const result = [];
    for (let booking of bookings) {
        booking = booking.toJSON();
        result.push(booking);
    }
    res.json({ Bookings: result });
});


router.put('/:bookingId', requireAuth, restoreUser, async (req, res, next) => {
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
