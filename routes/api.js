const router = require('express').Router()
const path = require('path')
const fs = require('fs')
const connection = require('../db/connection')

const dbPath = path.join(__dirname, "..", "db", "animals.json")

router.get('/animals', async (req, res) => {
  try {
    const [results] = await connection.promise().query(`
      SELECT animals.id, animals.name, animals.age, animalTypes.name AS animalType
      FROM animals
      INNER JOIN animalTypes ON animals.animalTypeId = animalTypes.id
    `)
    res.status(200).json(results)
  } catch(err) {
    res.status(500).json(err)
  }
})

router.post('/animals', async (req, res) => {
  const { name, age, animalTypeId } = req.body

  if (!name || !age || !animalTypeId) {
    res.status(400).json({ error: 'Missing name, age, or animalTypeId.' })
    return
  }

  try {
    await connection.promise().query(
      "INSERT INTO animals (name, age, animalTypeId) VALUES (?, ?, ?)",
      [name, age, animalTypeId]
    )
    res.json(true)
  } catch(err) {
    res.status(500).json(err)
  }
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