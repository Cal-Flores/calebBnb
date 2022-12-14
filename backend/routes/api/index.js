const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots');
const reviewRouter = require('./reviews');
const bookingRouter = require('./bookings');
const spotImageRouter = require('./spot-images');
const reviewImageRouter = require('./review-images');
const { restoreUser } = require('../../utils/auth.js');




router.use(restoreUser);


router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use("/spots", spotsRouter);

router.use('/reviews', reviewRouter);

router.use('/bookings', bookingRouter);

router.use('/spot-images', spotImageRouter);

router.use('/review-images', reviewImageRouter);

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});








module.exports = router;

//  FOR TESTING PURPOSES
//const { requireAuth } = require('../../utils/auth.js');
//const { User } = require('../../db/models');
//const { setTokenCookie } = require('../../utils/auth.js');
// router.get('/require-auth', requireAuth, (req, res) => {
//     return res.json(req.user);
// }
// );

// router.post('/test', function (req, res) {
//     res.json({ requestBody: req.body });
// });

// router.get('/restore-user', (req, res) => {
//     return res.json(req.user);
// }
// );

// router.get('/set-token-cookie', async (_req, res) => {
//     const user = await User.findOne({
//         where: {
//             username: 'Demo-lition'
//         }
//     });
//     setTokenCookie(res, user);
//     return res.json({ user });
// });
