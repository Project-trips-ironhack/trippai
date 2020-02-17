let allButtons = [...document.querySelectorAll('.options')]
let daysButtons = [...document.querySelectorAll('.days')]
let dolarButtons = [...document.querySelectorAll('.dolar')]
let tagsButtons = [...document.querySelectorAll('.tags')]
let buttonClickedDayArr = ''
let buttonClickedDolarArr = ''
let buttonClickedTagsArr = []
let buttonNonClickedTagArr = []


document.addEventListener('DOMContentLoaded', () => {
  console.log('IronGenerator JS imported successfully!');

}, false);

window.onload = function () {
  tagsButtons.forEach((button) => {
    button.classList.add('nonClickedTags')

  })
}



daysButtons.forEach((button, idx, arr) => {

  button.addEventListener('click', function (event) {
    event.preventDefault()
    daysButtons.forEach((button) => {
      button.classList.remove('clickedDays')
    })
    button.classList.add('clickedDays')
  })
})
dolarButtons.forEach((button) => {
  button.addEventListener('click', function (event) {
    event.preventDefault()
    dolarButtons.forEach((button) => {
      button.classList.remove('clickedDolar')
    })
    button.classList.add('clickedDolar')

  })
})
tagsButtons.forEach((button, idx) => {
  button.addEventListener('click', function (event) {
    event.preventDefault()
    button.classList.toggle('nonClickedTags')
    button.classList.toggle('clickedTags')
  })
})


function removeClicked() {
  allButtons.forEach(button => {
    button.classList.remove('clickedTags', 'clickedButtons', 'clickedDays', 'nonClickedTags')
  })
  buttonClickedArr = []
  buttonClickedTagsArr = []

}


document.querySelector('#save').addEventListener('click', function () {
  let btnArrDays = [...document.querySelectorAll('.clickedDays')]
  let btnArrDolar = [...document.querySelectorAll('.clickedDolar')]
  let btnArrTags = [...document.querySelectorAll('.clickedTags')]
  let btnArrTagsNonClicked = [...document.querySelectorAll('.nonClickedTags')]

  btnArrTagsNonClicked.forEach((btn) => {
    buttonNonClickedTagArr.push(btn.value)
  })
  btnArrDays.forEach((btn) => {
    buttonClickedDayArr = +btn.value
  })
  btnArrDolar.forEach((btn) => {
    buttonClickedDolarArr = btn.value
  })
  btnArrTags.forEach((btn) => {
    buttonClickedTagsArr.push(btn.value)
  })

  document.getElementById('days').value = buttonClickedDayArr
  document.getElementById('budget').value = buttonClickedDolarArr
  document.getElementById('tagsWanted').value = buttonClickedTagsArr
  document.getElementById('tagsNotWanted').value = buttonNonClickedTagArr

  removeClicked()
})