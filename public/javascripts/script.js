document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);

let allButtons = [...document.querySelectorAll('.options')]
let daysButtons = [...document.querySelectorAll('.days')]
let dolarButtons = [...document.querySelectorAll('.dolar')]
let tagsButtons = [...document.querySelectorAll('.tags')]
let buttonClickedDayArr = ''
let buttonClickedDolarArr = ''
let buttonClickedTagsArr = []
let buttonClickedArr = []

function buttonClicked(daysButtons, dolarButtons, tagsButtons) {
  daysButtons.forEach((button, idx, arr) => {

    button.addEventListener('click', function () {
      daysButtons.forEach((button) => {
        button.classList.remove('clickedDays')
      })
      button.classList.add('clickedDays')

    })
  })
  dolarButtons.forEach((button) => {
    button.addEventListener('click', function () {
      dolarButtons.forEach((button) => {
        button.classList.remove('clickedDolar')
      })
      button.classList.add('clickedDolar')

    })
  })
  tagsButtons.forEach((button) => {
    button.addEventListener('click', function () {
      if (button.classList.contains('clicked')) {
        button.classList.remove('clickedTags')
      } else {
        button.classList.add('clickedTags')
      }
    })
  })
}

function removeClicked() {
  allButtons.forEach(button => {
    button.classList.remove('clickedTags', 'clickedButtons', 'clickedDays')
  })
  buttonClickedArr = []
  buttonClickedTagsArr = []

}

function firstSave() {
  buttonClicked(daysButtons, dolarButtons, tagsButtons)
  document.querySelector('#save').addEventListener('click', function () {
    let btnArrDays = [...document.querySelectorAll('.clickedDays')]
    let btnArrDolar = [...document.querySelectorAll('.clickedDolar')]
    let btnArrTags = [...document.querySelectorAll('.clickedTags')]

    btnArrDays.forEach((btn) => {
      buttonClickedDayArr = +btn.value
    })
    btnArrDolar.forEach((btn) => {
      buttonClickedDolarArr = btn.value
    })
    btnArrTags.forEach((btn) => {
      buttonClickedTagsArr.push(btn.value)
    })

    console.log(buttonClickedDayArr)
    console.log(buttonClickedDolarArr)
    console.log(buttonClickedTagsArr)


    removeClicked()
  })
}



firstSave()