const router = require('express').Router();

// /api/'whatever'
router.post('/test', function (req, res) {
    res.json({ requestBody: req.body });
});











module.exports = router;
