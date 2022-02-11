const router = require('express').Router();

const usersRoutes = require('./user_routes');
const thoughtsRoutes = require('./thought_routes');

router.use('/users', usersRoutes);

router.use('/thoughts', thoughtsRoutes);

module.exports = router;