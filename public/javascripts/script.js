document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);

let allButtons = [...document.querySelectorAll('.options')]
let daysButtons = [...document.querySelectorAll('.days')]
let dolarButtons = [...document.querySelectorAll('.dolar')]
let typeButtons = [...document.querySelectorAll('.type')]
let buttonClickedArr = []

function buttonClicked(daysButtons, dolarButtons, typeButtons) {
  daysButtons.forEach((button, idx, arr) => {

    button.addEventListener('click', function () {
      daysButtons.forEach((button) => {
        button.classList.remove('clicked')
      })
      button.classList.add('clicked')

    })
  })
  dolarButtons.forEach((button) => {
    button.addEventListener('click', function () {
      dolarButtons.forEach((button) => {
        button.classList.remove('clicked')
      })
      button.classList.add('clicked')

    })
  })
  typeButtons.forEach((button) => {
    button.addEventListener('click', function () {
      if (button.classList.contains('clicked')) {
        button.classList.remove('clicked')
      } else {
        button.classList.add('clicked')
      }
    })
  })
}

function removeClicked() {
  allButtons.forEach(button => {
    button.classList.remove('clicked')
  })

}

function firstSave() {
  buttonClicked(daysButtons, dolarButtons, typeButtons)
  document.querySelector('#save').addEventListener('click', function () {
    let btnArr = document.querySelectorAll('.clicked')
    btnArr.forEach((btn) => {
      buttonClickedArr.push(btn.value)
    })
    console.log(buttonClickedArr)

    removeClicked()
  })
}



firstSave()