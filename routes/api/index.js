const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

//localhost:3001/api/ -->
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;