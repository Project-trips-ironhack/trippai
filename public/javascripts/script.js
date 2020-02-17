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
        button.classList.remove('clickedButtons')
      })
      button.classList.add('clickedButtons')

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
    let btnArrTags = document.querySelectorAll('.clickedTags')
    btnArrTags.forEach((btn) => {
      buttonClickedTagsArr.push(btn.value)
    })

    console.log(buttonClickedTagsArr)


    removeClicked()
  })
}



firstSave()