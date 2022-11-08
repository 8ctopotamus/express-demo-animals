const select = document.querySelector('select')
const animalContainer = document.getElementById('animals-container')

const renderAnimals = (animals) => {
  animalContainer.innerHTML = ''
  animals.forEach(animal => {
    const li = document.createElement('li')
    li.innerHTML = `
      <h2>${animal.name}</h2>
      <p>${animal.type} | ${animal.age}</p>
    `
    animalContainer.appendChild(li)
  })
}

select.addEventListener('change', e => {
  const animalType = e.target.value
  
  fetch(`/api/animals/${animalType}`)
    .then(response => response.json())
    .then(animals => renderAnimals(animals))
    .catch(err => console.log(err))
})

// fetch all animals on page-load
fetch('/api/animals')
  .then(response => response.json())
  .then(animals => renderAnimals(animals))
  .catch(err => console.log(err))