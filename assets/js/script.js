const myModal = document.getElementById('#modal')
const myInput = document.getElementById('#detalles')

myModal.addEventListener('shown.bs.modal', () => {
  myInput.focus()
})