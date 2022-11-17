const select = document.querySelector('select')
const animalContainer = document.getElementById('animals-container')

const renderAnimals = (animals) => {
  animalContainer.innerHTML = ''
  animals.forEach(animal => {
    const li = document.createElement('li')
    li.innerHTML = `
      <div class="card">
        <h2>${animal.name}</h2>
        <p>${animal.animalType} | ${animal.age}</p>
        <button data-id="${animal.id}">X</button>
      </div>
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

animalContainer.addEventListener('click', e => {
  if (e.target.matches('button')) {
    const id = e.target.dataset.id
    fetch(`/api/animals/${id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(() => getAllAnimals())
      .catch(err => console.log(err))
  }
})

function getAllAnimals() {
  fetch('/api/animals')
    .then(response => response.json())
    .then(animals => renderAnimals(animals))
    .catch(err => console.log(err))
}

// fetch all animals on page-load
getAllAnimals()