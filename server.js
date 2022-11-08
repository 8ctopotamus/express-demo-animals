const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
const PORT = 3000

app.use(express.static("public"))
app.use(express.json())

// API routes
app.get('/api/animals', (req, res) => {
  // read animals.json contents
  fs.readFile(path.join(__dirname, "animals.json"), 'utf-8', function(err, data) {
    if (err) {
      res.status(500).json(err)
      return
    }
    const json = JSON.parse(data)
    // respond with the parsed array
    res.json(json)
  }) 
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

  // Read contents of animals.json
  fs.readFile(path.join(__dirname, "animals.json"), "utf-8", function(err, data) {
    if (err) {
      res.status(500).json(err)
      return
    }
    // parse string into JSON
    const animalData = JSON.parse(data)
    // push our animal into json
    animalData.push(newAnimal)
    // stringify animals array and save file
    fs.writeFile(path.join(__dirname, "animals.json"), JSON.stringify(animalData), function(err) {
      if (err) {
        res.status(500).json(err)
        return
      }
      res.status(200).json(newAnimal)
    })
  })
})

app.get('/api/animals/:animalType', (req, res) => {
  const animalType = req.params.animalType
  
  const pattern = /[a-z]/g

  if (!pattern.test(animalType)) {
    res.status(400).json({ error: 'Not a valid animalType' })
    return
  }
  
  fs.readFile(path.join(__dirname, 'animals.json'), 'utf-8', function(err, data) {
    if (err) {
      res.status(500).json(err)
      return
    }
    const animalData = JSON.parse(data)
    const results = animalData.filter(animal => animal.type === animalType)

    if (results.length === 0) {
      res.status(404)
    }

    res.json(results)
  })
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