// import Axios from "axios";

// import Axios from "axios";

let newPlan = {
    tags: ['party'],
    budget: '💵',
    name: 'Not provided',
    city: {
        name: 'IRON',
        country: 'HACK'
    },
    user: 'undefined',
    description: 'Not provided',
    numberOfDays: 2,
    days: [{
        index: 1,
        breakfast: {
            place: 'Not provided',
            address: 'Not provided',
            position: {
                lat: 40.4378698,
                lon: -3.8196207
            },
            description: 'Not provided',
        },
        morning: [{
            place: 'Not provided',
            address: 'Not provided',
            duration: '30min-1hour',
            position: {
                lat: 40.4378698,
                lon: -3.8196207
            },
            description: 'Not provided'
        }],
        lunch: {
            place: 'Not provided',
            address: 'Not provided',
            position: {
                lat: 40.4378698,
                lon: -3.8196207
            },
            description: 'Not provided'
        },
        afternoon: [{
            place: 'Not provided',
            address: 'Not provided',
            duration: '30min-1hour',
            position: {
                lat: 40.4378698,
                lon: -3.8196207
            },
            description: 'Not provided'
        }],
        dinner: {
            place: 'Not provided',
            address: 'Not provided',
            position: {
                lat: 40.4378698,
                lon: -3.8196207
            },
            description: 'Not provided'
        }
    }, {
        index: 2,
        breakfast: {
            place: 'Not provided',
            address: 'Not provided',
            position: {
                lat: 40.4378698,
                lon: -3.8196207
            },
            description: 'Not provided',
        },
        morning: [{
            place: 'Not provided',
            address: 'Not provided',
            duration: '30min-1hour',
            position: {
                lat: 40.4378698,
                lon: -3.8196207
            },
            description: 'Not provided'
        }],
        lunch: {
            place: 'Not provided',
            address: 'Not provided',
            position: {
                lat: 40.4378698,
                lon: -3.8196207
            },
            description: 'Not provided'
        },
        afternoon: [{
            place: 'Not provided',
            address: 'Not provided',
            duration: '30min-1hour',
            position: {
                lat: 40.4378698,
                lon: -3.8196207
            },
            description: 'Not provided'
        }],
        dinner: {
            place: 'Not provided',
            address: 'Not provided',
            position: {
                lat: 40.4378698,
                lon: -3.8196207
            },
            description: 'Not provided'
        }
    }]
};

const buttonCreate = document.getElementById("buttonCreate")

buttonCreate.addEventListener("click", function (e) {

    console.log('asdfasfasdffasdf')
    axios.post('/create', newPlan)
        .then(response => {
            console.log('post successful and the response is: ', response);
        })
        .catch(error => {
            console.log('Oh No! Error is: ', error);
        })
})

const daysCreate = document.querySelector("#daysCreate")


daysCreate.addEventListener("change", function (e) {
    e.preventDefault();
    let daySelection = document.querySelector("#daysCreate");
    let tabsList = document.querySelector(".tabs ul");
    let contentsDiv = document.querySelector("#contentsDiv");

    console.log(daySelection.value)

    generateTab(daySelection.value, tabsList, contentsDiv);
});



function generateTab(number, menuContainer, divsContainer) {
    document.querySelectorAll(".day-item").forEach(item => {
        item.innerHTML = ""
    })

    for (let i = 1; i <= number; i++) {
        let link = `<li class="day-item"><a>Day ${i} </a></li>`;
        menuContainer.innerHTML += link;
        let tab = `<section class="day-item tab-content"> Day ${i}
  <div>
      <div class="columns"> 
          <div class="column">
              <div>
                  <div class="field">
                      <h4>Breakfast</h4>
                      <label class="label">Place</label>
                      <div class="control">
                          <input id="breakfastPlaceDay${i}" class="input searchInput" type="text"
                              placeholder="Name of the place">
                      </div>
                  </div>
                  <div class="field">
                      <label class="label">Address</label>
                      <div class="control has-icons-left has-icons-right">
                          <span class="icon is-small is-left">
                              <i class="fas fa-city"></i>
                          </span>
                          <input id="breakfastAddressDay${i}" class="input" type="text"
                              placeholder="Address">
                      </div>
                  </div>
                  <div class="field">
                      <label class="label">Description</label>
                      <div class="control">
                          <textarea id="breakfastDescriptionDay${i}" class="textarea"
                              placeholder="Describe you plan here"></textarea>
                      </div>
                  </div>
              </div>

          </div>
          <div class="column">
              <div>
                  <div class="field">
                      <h4>Lunch</h4>
                      <label class="label">Place</label>
                      <div class="control">
                          <input id="lunchPlaceDay${i}" class="input" type="text"
                              placeholder="Name of the place">
                      </div>
                  </div>
                  <div class="field">
                      <label class="label">Address</label>
                      <div class="control has-icons-left has-icons-right">
                          <span class="icon is-small is-left">
                              <i class="fas fa-city"></i>
                          </span>
                          <input id="lunchAddressDay${i}" class="input" type="text"
                              placeholder="Address">
                      </div>
                  </div>
                  <div class="field">
                      <label class="label">Description</label>
                      <div class="control">
                          <textarea id="lunchDescriptionDay${i}" class="textarea"
                              placeholder="Describe you plan here"></textarea>
                      </div>
                  </div>
              </div>
          </div>
          <div class="column">
              <div>
                  <div class="field">
                      <h4>Dinner</h4>
                      <label class="label">Place</label>
                      <div class="control">
                          <input id="dinnerPlaceDay${i}" class="input" type="text" placeholder="Name of the place">
                      </div>
                  </div>
                  <div class="field">
                      <label class="label">Address</label>
                      <div class="control has-icons-left has-icons-right">
                          <span class="icon is-small is-left">
                              <i class="fas fa-city"></i>
                          </span>
                          <input id="dinnerAddressDay${i}" class="input" type="text"
                              placeholder="Address">
                      </div>
                  </div>
                  <div class="field">
                      <label class="label">Description</label>
                      <div class="control">
                          <textarea id="dinnerDescriptionDay${i}" class="textarea"
                              placeholder="Describe you plan here"></textarea>
                      </div>
                  </div>
              </div>
          </div>
          <div class="column">
              <div>
                  <div class="field">
                      <h4>Morning</h4>
                      <label class="label">Place</label>
                      <div class="control">
                          <input id="morningPlaceDay${i}" class="input" type="text" placeholder="Name of the place">
                      </div>
                  </div>
                  <div class="field">
                      <label class="label">Time</label>
                      <div class="control">
                          <input id="morningTimeDay${i}" class="input" type="text" placeholder="Name of the place">
                      </div>
                  </div>
                  <div class="field">
                      <label class="label">Address</label>
                      <div class="control has-icons-left has-icons-right">
                          <span class="icon is-small is-left">
                              <i class="fas fa-city"></i>
                          </span>
                          <input id="morningAddressDay${i}" class="input" type="text" placeholder="Address">
                      </div>
                  </div>
                  <div class="field">
                      <label class="label">Description</label>
                      <div class="control">
                          <textarea id="morningDescriptionDay${i}" class="textarea"
                              placeholder="Describe you plan here"></textarea>
                      </div>
                  </div>
              </div>
          </div>
          <div class="column">
              <div>
                  <div class="field">
                      <h4>Afternoon</h4>
                      <label class="label">Place</label>
                      <div class="control">
                          <input id="afternoonPlaceDay${i}" class="input" type="text" placeholder="Name of the place">
                      </div>
                  </div>
                  <div class="field">
                      <label class="label">Time</label>
                      <div class="control">
                          <input id="afternoonTimeDay${i}" class="input" type="text" placeholder="Name of the place">
                      </div>
                  </div>
                  <div class="field">
                      <label class="label">Address</label>
                      <div class="control has-icons-left has-icons-right">
                          <span class="icon is-small is-left">
                              <i class="fas fa-city"></i>
                          </span>
                          <input id="afternoonAddressDay${i}" class="input" type="text" placeholder="Address">
                      </div>
                  </div>
                  <div class="field">
                      <label class="label">Description</label>
                      <div class="control">
                          <textarea id="afternoonDescriptionDay${i}" class="textarea"
                              placeholder="Describe you plan here"></textarea>
                      </div>
                  </div>
              </div>
          </div>

      </div>

  </div>
</section>`;
        divsContainer.innerHTML += tab;

    }

    let tabsWithContent = (function () {
        let tabs = document.querySelectorAll('.tabs li');
        let tabsContent = document.querySelectorAll('.tab-content');

        let deactvateAllTabs = function () {
            tabs.forEach(function (tab) {
                tab.classList.remove('is-active');
            });
        };

        let hideTabsContent = function () {
            tabsContent.forEach(function (tabContent) {
                tabContent.classList.remove('is-active');
            });
        };

        let activateTabsContent = function (tab) {
            tabsContent[getIndex(tab)].classList.add('is-active');
        };

        let getIndex = function (el) {
            return [...el.parentElement.children].indexOf(el);
        };

        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                deactvateAllTabs();
                hideTabsContent();
                tab.classList.add('is-active');
                activateTabsContent(tab);
            });
        })

        tabs[0].click();
    })();

}



// let content = `<section class="tab-content">Day ${i+1} schedule</section>`;
// const contentsDiv = document.querySelector('.contentsDiv');
// contentsDiv.innerHTML += content;
// document.querySelector('submitDescription').addEventListener('click', () => {
//     let name = document.getElementById('name').value;
//     let city = document.getElementById('city').value;
//     let name = document.getElementById('name').value;
//     let name = document.getElementById('name').value;
//     let name = document.getElementById('name').value;

//     let tabsCreation;

//     const number = document.getElementById('days').value;

//     for(let i = 0; i < numberOfDays; i++) {
//         let tab = `<li><a>Day ${i+1}</a></li>`;
//         const tabsList = document.querySelector('.tabs ul');
//         tabsList.innerHTML += tab;

//         let content = `<section class="tab-content">Day ${i+1} schedule</section>`;
//         const contentsDiv = document.querySelector('.contentsDiv');
//         contentsDiv.innerHTML += content;
//     }

//     name
//     city
//     description
//     budget
//     type
//     days (number)
// });