document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);

let allButtons = [...document.querySelectorAll('.options')]
let buttonClickedArr = []

function buttonClicked(allButtons) {
  
  allButtons.forEach((button) => {
    button.addEventListener('click', function () {
      button.classList.add('clicked')
    
    })
      
  })


  

}


function firstSave() {
  buttonClicked(allButtons)
  document.querySelector('#save').addEventListener('click', function () {
    
    let btnArr = document.querySelectorAll('.clicked')
    btnArr.forEach((btn) => {
        buttonClickedArr.push(btn.value)
    })

    
    console.log(buttonClickedArr)
  })
}

firstSave()


