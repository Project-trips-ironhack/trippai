const daysSelector = document.getElementById("daysCreate");
const buttonCreate = document.getElementById("buttonCreate")
const userId = document.getElementById("currentUserId")
// let tagsButtons = [...document.querySelectorAll('.tags')]
// let buttonClickedTagsArr = []


buttonCreate.addEventListener("click", function (e) {
    let btnArrTags = [...document.querySelectorAll('.clickedTags')]
    let days = []
    let day

    btnArrTags.forEach((btn) => {
        buttonClickedTagsArr.push(btn.value)
    })
    debugger
    // document.getElementById('tagsWanted').value = buttonClickedTagsArr

    for (let i = 1; i <= daysSelector.value; i++) {
        day = {
            index: i,
            breakfast: {
                place: document.querySelector(`#breakfastPlaceDay${i}`).value,
                address: document.querySelector(`#breakfastAddressDay${i}`).value,
                position: {
                    lat: 40.4378698,
                    lon: -3.8196207
                },
                description: document.querySelector(`#breakfastDescriptionDay${i}`).value,
            },
            morning: [{
                place: document.querySelector(`#morningPlaceDay${i}`).value,
                address: document.querySelector(`#morningAddressDay${i}`).value,
                duration: document.querySelector(`#morningTimeDay${i}`).value,
                position: {
                    lat: 40.4378698,
                    lon: -3.8196207
                },
                description: document.querySelector(`#morningDescriptionDay${i}`).value
            }],
            lunch: {
                place: document.querySelector(`#lunchPlaceDay${i}`).value,
                address: document.querySelector(`#lunchAddressDay${i}`).value,
                position: {
                    lat: 40.4378698,
                    lon: -3.8196207
                },
                description: document.querySelector(`#lunchDescriptionDay${i}`).value
            },
            afternoon: [{
                place: document.querySelector(`#afternoonPlaceDay${i}`).value,
                address: document.querySelector(`#afternoonAddressDay${i}`).value,
                duration: document.querySelector(`#afternoonTimeDay${i}`).value,
                position: {
                    lat: 40.4378698,
                    lon: -3.8196207
                },
                description: document.querySelector(`#afternoonDescriptionDay${i}`).value
            }],
            dinner: {
                place: document.querySelector(`#dinnerPlaceDay${i}`).value,
                address: document.querySelector(`#dinnerAddressDay${i}`).value,
                position: {
                    lat: 40.4378698,
                    lon: -3.8196207
                },
                description: document.querySelector(`#dinnerDescriptionDay${i}`).value
            }
        }
        console.log(day)
        days.push(day)

    }
    let newPlan = {
        tags: buttonClickedTagsArr,
        budget: document.querySelector(`#travelBudget`).value,
        name: document.querySelector(`#travelName`).value,
        city: {
            name: document.querySelector(`#cityName`).value,
            country: 'HACK'
        },
        user: userId.value,
        description: document.querySelector(`#travelDescription`).value,
        numberOfDays: daysSelector.value,
        days: days
    };
    console.log('asdfasfasdffasdf')
    axios.post('/create', newPlan)
        .then(response => {
            console.log('post successful and the response is: ', response);
        })
        .catch(error => {
            console.log('Oh No! Error is: ', error);
        })
    removeClicked()
})


if (daysSelector) {
    daysSelector.addEventListener("change", function (e) {
        e.preventDefault();
        let tabsList = document.querySelector(".tabs ul");
        let contentsDiv = document.querySelector("#contentsDiv");
        generateTab(daysSelector.value, tabsList, contentsDiv);
        tabsWithContent()
    });
}

function initAutocomplete() {
    // Create the search box and link it to the UI element.
    console.log("entra")
    let inputCity = document.getElementById('cityName');
    let searchBox = new google.maps.places.SearchBox(inputCity);

    searchBox.addListener('places_changed', function () {
        let places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        places.forEach(place => {
            inputCity.value = place.name;
        });
    });

}

function tabsWithContent() {
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


};



function generateTab(number, menuContainer, divsContainer) {
    document.querySelectorAll(".day-item").forEach(item => {
        item.innerHTML = ""
    })
    console.log("ola");
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



}