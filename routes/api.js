const router = require('express').Router()
const path = require('path')
const fs = require('fs')
const connection = require('../db/connection')

const dbPath = path.join(__dirname, "..", "db", "animals.json")

router.get('/animals', async (req, res) => {
  try {
    const [results] = await connection.promise().query("SELECT * FROM animals")
    res.status(200).json(results)
  } catch(err) {
    res.status(500).json(err)
  }
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

router.delete('/animals/:id', async (req, res) => {
  const id = req.params.id

  if (!id) {
    return res.status(400).json({ error: "We need an id" })
  }

  try {
    await connection.promise().query("DELETE FROM animals WHERE id = ?", [id])
    res.json(true)
  } catch(err) {
    res.status(500).json(err)
  }
})

module.exports = router