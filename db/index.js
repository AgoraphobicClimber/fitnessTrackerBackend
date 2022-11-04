const router = require('express').Router();

router.get('/health', (req, res, next) =>{
    res.send('Healthy server :)')
})
router.use('/auth', require('./auth'))

module.exports = router

