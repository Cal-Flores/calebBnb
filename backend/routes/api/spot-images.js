const express = require('express');
const {
    setTokenCookie,
    restoreUser,
    requireAuth,
    authenticate,
} = require('../../utils/auth');
const { Op } = require("sequelize");
const { User, Spot, Image, Review, Booking, SpotImage } = require("../../db/models");
const { Sequelize } = require("sequelize");
const router = express.Router();


const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

router.delete('/:imageId', requireAuth, restoreUser, async (req, res, next) => {
    const img = await SpotImage.findByPk(req.params.imageId);
    if (!img) {
        return res.json({
            "message": "Spot Image couldn't be found",
            "statusCode": 404
        });
    }
    await img.destroy();
    return res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})







module.exports = router;
