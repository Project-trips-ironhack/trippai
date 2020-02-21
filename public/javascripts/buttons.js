let allButtons = [...document.querySelectorAll('.options')]
let daysButtons = [...document.querySelectorAll('.days')]
let dolarButtons = [...document.querySelectorAll('.dolar')]
let tagsButtons = [...document.querySelectorAll('.tags')]
let buttonSearch = document.querySelector('#save')
let detailsCityName = document.getElementById('cityName')
let buttonClickedDayArr = ''
let buttonClickedDolarArr = ''
let buttonClickedTagsArr = []
let buttonNonClickedTagArr = []


function addTagsClasses() {
  tagsButtons.forEach((button) => {
    button.classList.add('nonClickedTags')
  })
}

function removeClicked() {
  allButtons.forEach(button => {
    button.classList.remove('clickedTags', 'clickedButtons', 'clickedDays', 'nonClickedTags')
  })
  buttonClickedArr = []
  buttonClickedTagsArr = []

}

if (buttonSearch || detailsCityName) {
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

  if (buttonSearch) {
    buttonSearch.addEventListener('click', function () {
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
  }
}



