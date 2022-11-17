const router = require('express').Router()
const viewRoutes = require('./views.js')
const apiRoutes = require('./api.js')

router.use('/api', apiRoutes)
router.use(viewRoutes)

module.exports = router