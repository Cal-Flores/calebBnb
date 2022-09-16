const express = require('express');
const {
    setTokenCookie,
    restoreUser,
    requireAuth,
    authenticate,
} = require('../../utils/auth');
const { Op } = require("sequelize");
const { User, Spot, Image, Review, Booking, SpotImage, ReviewImage } = require("../../db/models");
const { Sequelize } = require("sequelize");
const router = express.Router();




router.delete('/:imageId', requireAuth, restoreUser, async (req, res, next) => {
    const img = await ReviewImage.findByPk(req.params.imageId);
    if (!img) {
        res.status(404)
        return res.json({ "message": "Review Image couldn't be found" })
    }
    await img.destroy()
    return res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})




module.exports = router;
