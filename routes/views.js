const router = require('express').Router()
const path = require('path')

router.get('/', (req, res) => {
  res.sendFile( path.join(__dirname, "..", "public", "index.html") )
})

router.get('/add-animal', (req, res) => {
  res.sendFile( path.join(__dirname, "..", "public", "add-animal.html") )
})

module.exports = router