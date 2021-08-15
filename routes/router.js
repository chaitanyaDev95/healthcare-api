var router = require('express').Router(); 
module.exports = router;

// mount our 'users' router onto the API router
router.use('/users', require('../controllers/user.controller'));