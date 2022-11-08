const form = document.querySelector('form')
const nameInput = document.querySelector('[name="name"]')
const ageInput = document.querySelector('[name="age"]')
const typeInput = document.querySelector('[name="type"]')


function handleSubmit(event) {
  event.preventDefault()
  
  const newAnimal = {
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
  }

  fetch('/api/animals', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newAnimal)
  })
    .then(response => response.json())
    .then(animal => {
      window.location.href = '/'
    })
    .catch(err => console.log(err))
}


form.addEventListener('submit', handleSubmit)