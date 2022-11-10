const express = require('express')
const routes = require('./routes')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static("public"))
app.use(express.json())

app.use(routes)

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})