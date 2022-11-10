const router = require('express').Router()
const path = require('path')
const fs = require('fs')

const dbPath = path.join(__dirname, "..", "db", "animals.json")

router.get('/animals', (req, res) => {
  // read animals.json contents
  fs.readFile(dbPath, 'utf-8', function(err, data) {
    if (err) {
      res.status(500).json(err)
      return
    }
    const json = JSON.parse(data)
    // respond with the parsed array
    res.json(json)
  }) 
})

router.post('/animals', (req, res) => {
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
  fs.readFile(dbPath, "utf-8", function(err, data) {
    if (err) {
      res.status(500).json(err)
      return
    }
    // parse string into JSON
    const animalData = JSON.parse(data)
    // push our animal into json
    animalData.push(newAnimal)
    // stringify animals array and save file
    fs.writeFile(dbPath, JSON.stringify(animalData), function(err) {
      if (err) {
        res.status(500).json(err)
        return
      }
      res.status(200).json(newAnimal)
    })
  })
})

router.get('/animals/:animalType', (req, res) => {
  const animalType = req.params.animalType
  
  const pattern = /[a-z]/g

  if (!pattern.test(animalType)) {
    res.status(400).json({ error: 'Not a valid animalType' })
    return
  }
  
  fs.readFile(dbPath, 'utf-8', function(err, data) {
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

router.delete('/animals/:id', (req, res) => {
  const id = req.params.id

  if (!id) {
    return res.status(400).json({ error: "We need an id" })
  }

  // read json file
  fs.readFile(dbPath, "utf8", function(err, data) {
    // parse the contents
    const animalData = JSON.parse(data)
    // modify contents
    const updatedAnimalData = animalData.filter(animal => id != animal.id)
    // stringify contents and re-save file
    fs.writeFile(dbPath, JSON.stringify(updatedAnimalData), function(err) {
      if (err) {
        return res.status(500).json(err)
      }
      res.json(true)
    })
  })

  console.log('Delete route hit!')
})

module.exports = router