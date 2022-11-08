const path = require('path')
const express = require('express')
const app = express()
const PORT = 3000
const animalData = require('./animals.json')

app.use(express.static("public"))
app.use(express.json())

// API routes
app.get('/api/animals', (req, res) => {
  res.json(animalData)
})

app.post('/api/animals', (req, res) => {
  const { name, age, type } = req.body

  if (!name || !age || !type) {
    res.status(400).json({ error: 'Missing name, age, or type.' })
    return
  }

  const newAnimal = {
    ...req.body,
    id: Math.random()
  }

  animalData.push(newAnimal)

  res.json(newAnimal)
})

app.get('/api/animals/:animalType', (req, res) => {
  const animalType = req.params.animalType
  
  const pattern = /[a-z]/g

  if (!pattern.test(animalType)) {
    res.status(400).json({ error: 'Not a valid animalType' })
    return
  }
  
  const results = animalData.filter(animal => animal.type === animalType)

  if (results.length === 0) {
    res.status(404)
  }

  res.json(results)
})


// view (html) routes
app.get('/', (req, res) => {
  res.sendFile( path.join(__dirname, "public", "index.html") )
})

app.get('/add-animal', (req, res) => {
  res.sendFile( path.join(__dirname, "public", "add-animal.html") )
})

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})