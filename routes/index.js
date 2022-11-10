const router = require('express').Router()
const viewRoutes = require('./views.js')
const apiRoutes = require('./api.js')
const logger = require('../middleware/logger')

router.use('/api', logger, apiRoutes)
router.use(viewRoutes)

module.exports = router