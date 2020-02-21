const daysSelector = document.getElementById("daysCreate");
const buttonCreate = document.getElementById("buttonCreate")
const userId = document.getElementById("currentUserId")
let country


buttonCreate.addEventListener("click", function (e) {
    e.preventDefault();
    let btnArrTags = [...document.querySelectorAll('.clickedTags')]
    let days = []
    let day
    let clickedTags = []
    console.log(clickedTags)
    btnArrTags.forEach((btn) => {
        clickedTags.push(btn.value)
    })

    for (let i = 1; i <= daysSelector.value; i++) {
        day = {
            index: i,
            breakfast: {
                place: document.querySelector(`#breakfastPlaceDay${i}`).value,
                address: document.querySelector(`#breakfastAddressDay${i}`).value,
                position: {
                    lat: document.querySelector(`#breakfastLatDay${i}`).value,
                    lon: document.querySelector(`#breakfastLonDay${i}`).value
                },
                description: document.querySelector(`#breakfastDescriptionDay${i}`).value,
            },
            morning: [{
                place: document.querySelector(`#morningPlaceDay${i}`).value,
                address: document.querySelector(`#morningAddressDay${i}`).value,
                duration: document.querySelector(`#morningTimeDay${i}`).value,
                position: {
                    lat: document.querySelector(`#morningLatDay${i}`).value,
                    lon: document.querySelector(`#morningLonDay${i}`).value
                },
                description: document.querySelector(`#morningDescriptionDay${i}`).value
            }],
            lunch: {
                place: document.querySelector(`#lunchPlaceDay${i}`).value,
                address: document.querySelector(`#lunchAddressDay${i}`).value,
                position: {
                    lat: document.querySelector(`#lunchLatDay${i}`).value,
                    lon: document.querySelector(`#lunchLonDay${i}`).value
                },
                description: document.querySelector(`#lunchDescriptionDay${i}`).value
            },
            afternoon: [{
                place: document.querySelector(`#afternoonPlaceDay${i}`).value,
                address: document.querySelector(`#afternoonAddressDay${i}`).value,
                duration: document.querySelector(`#afternoonTimeDay${i}`).value,
                position: {
                    lat: document.querySelector(`#afternoonLatDay${i}`).value,
                    lon: document.querySelector(`#afternoonLonDay${i}`).value
                },
                description: document.querySelector(`#afternoonDescriptionDay${i}`).value
            }],
            dinner: {
                place: document.querySelector(`#dinnerPlaceDay${i}`).value,
                address: document.querySelector(`#dinnerAddressDay${i}`).value,
                position: {
                    lat: document.querySelector(`#dinnerLatDay${i}`).value,
                    lon: document.querySelector(`#dinnerLonDay${i}`).value
                },
                description: document.querySelector(`#dinnerDescriptionDay${i}`).value
            }
        }
        console.log(day)
        days.push(day)

    }

    let nameCity = document.querySelector(`#cityName`).value
    let newPlan = {
        tags: clickedTags,
        budget: document.querySelector(`#travelBudget`).value,
        name: document.querySelector(`#travelName`).value,
        city: {
            name: nameCity,
            country: country,
            img: undefined,
            imgName: nameCity.replace(/\s+/g, '+').toLowerCase()
        },
        user: userId.value,
        description: document.querySelector(`#travelDescription`).value,
        numberOfDays: daysSelector.value,
        days: days
    };
    axios.post('/create', newPlan)
        .then(response => {
            console.log('post successful and the response is: ', response);
            console.log(response);
            window.location.href = `/plans/${response.data}/details`;
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

// City search box:
function initAutocomplete() {
    // Create the search box and link it to the UI element.
    let inputCity = document.getElementById('cityName');
    let searchBox = new google.maps.places.SearchBox(inputCity);

    searchBox.addListener('places_changed', function () {
        let places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        let countryFound = null;
        places[0].address_components.forEach(add =>{   
            add.types.forEach(type =>{         
               if(type === "country"){
                country = add.long_name;
               } 
            })
        })

        places.forEach(place => {
            inputCity.value = place.name; 
        });
    });
}


// Plan search boxes:
function placesAutocomplete() {
    let placesInputs = [...document.querySelectorAll('.search-input')];
    let addresses = [...document.querySelectorAll('.address')];
    let latInput = [...document.querySelectorAll('.lat-input')]
    let lonInput = [...document.querySelectorAll('.lon-input')]
    console.log(addresses);

    for(let i = 0; i < placesInputs.length; i++) {
        let searchBox = new google.maps.places.SearchBox(placesInputs[i]);
        searchBox.addListener('places_changed', function() {
            places = searchBox.getPlaces();
        
            if (places.length == 0) {
            return;
            }
    
            places.forEach(place => {
                placesInputs[i].value = place.name;
                addresses[i].value = place.formatted_address;
                // console.log(place.photos[0].getUrl())
                latInput[i].value = place.geometry.location.lat()
                lonInput[i].value = place.geometry.location.lng()
            });
        });
    }   
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
                          <input id="breakfastPlaceDay${i}" class="input search-input" type="text"
                              placeholder="Name of the place">
                      </div>
                  </div>
                  <div class="field">
                      <label class="label">Address</label>
                      <div class="control has-icons-left has-icons-right">
                          <span class="icon is-small is-left">
                              <i class="fas fa-city"></i>
                          </span>
                          <input id="breakfastAddressDay${i}" class="input address" type="text"
                              placeholder="Address">
                      </div>
                      <input type="hidden" id="breakfastLatDay${i}" class='lat-input' value=""></input>
                      <input type="hidden" id="breakfastLonDay${i}" class='lon-input' value=""></input>
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
                          <input id="lunchPlaceDay${i}" class="input search-input" type="text"
                              placeholder="Name of the place">
                      </div>
                  </div>
                  <div class="field">
                      <label class="label">Address</label>
                      <div class="control has-icons-left has-icons-right">
                          <span class="icon is-small is-left">
                              <i class="fas fa-city"></i>
                          </span>
                          <input id="lunchAddressDay${i}" class="input address" type="text"
                              placeholder="Address">
                      </div>
                      <input type="hidden" id="lunchLatDay${i}" class='lat-input' value=""></input>
                      <input type="hidden" id="lunchLonDay${i}" class='lon-input' value=""></input>
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
                          <input id="dinnerPlaceDay${i}" class="input search-input" type="text" placeholder="Name of the place">
                      </div>
                  </div>
                  <div class="field">
                      <label class="label">Address</label>
                      <div class="control has-icons-left has-icons-right">
                          <span class="icon is-small is-left">
                              <i class="fas fa-city"></i>
                          </span>
                          <input id="dinnerAddressDay${i}" class="input address" type="text"
                              placeholder="Address">
                      </div>
                      <input type="hidden" id="dinnerLatDay${i}" class='lat-input' value=""></input>
                      <input type="hidden" id="dinnerLonDay${i}" class='lon-input' value=""></input>
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
                          <input id="morningPlaceDay${i}" class="input search-input" type="text" placeholder="Name of the place">
                      </div>
                  </div>
                  <div class="field">
                      <label class="label">Address</label>
                      <div class="control has-icons-left has-icons-right">
                          <span class="icon is-small is-left">
                              <i class="fas fa-city"></i>
                          </span>
                          <input id="morningAddressDay${i}" class="input address" type="text" placeholder="Address">
                      </div>
                      <input type="hidden" id="morningLatDay${i}" class='lat-input' value=""></input>
                      <input type="hidden" id="morningLonDay${i}" class='lon-input' value=""></input>
                  </div>
                  <div class="field">
                  <label class="label">Time</label>
                  <div class="control">
                  <div class="select">
                  <select id="morningTimeDay${i}">
                  <option selected disabled>Choose</option>
                  <option value="30min-1hour">30min-1hour</option>
                  <option value="1-2 hours">1-2 hours</option>
                  <option value="2-3 hours">2-3 hours</option>
                  <option value="3 or more hours">3 or more hours</option>
              </select>
              </div>
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
                          <input id="afternoonPlaceDay${i}" class="input search-input" type="text" placeholder="Name of the place">
                      </div>
                  </div>
                  <div class="field">
                      <label class="label">Address</label>
                      <div class="control has-icons-left has-icons-right">
                          <span class="icon is-small is-left">
                              <i class="fas fa-city"></i>
                          </span>
                          <input id="afternoonAddressDay${i}" class="input address" type="text" placeholder="Address">
                      </div>
                      <input type="hidden" id="afternoonLatDay${i}" class='lat-input' value=""></input>
                      <input type="hidden" id="afternoonLonDay${i}" class='lon-input' value=""></input>
                  </div>
                  
                  <div class="field">
                      <label class="label">Time</label>
                      <div class="control">
                      <div class="select">
                      <select id="afternoonTimeDay${i}">
                      <option selected disabled>Choose</option>
                      <option value="30min-1hour">30min-1hour</option>
                      <option value="1-2 hours">1-2 hours</option>
                      <option value="2-3 hours">2-3 hours</option>
                      <option value="3 or more hours">3 or more hours</option>
                  </select>
                  </div>
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

  placesAutocomplete(); 


}