

let newPlan = {
    tags: ['party'],
    budget: '💵',
    name: 'Not provided',
    city:undefined ,
    user: undefined,
    description: 'Not provided',
    numberOfDays: 2,
    days: [
        {
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
            morning: [
                {
                    place: 'Not provided',
                    address: 'Not provided',
                    duration: '30min-1hour',
                    position: {
                        lat: 40.4378698,
                        lon: -3.8196207
                    },
                    description: 'Not provided'
                }
            ],
            lunch: {
                place: 'Not provided',
                address: 'Not provided',
                position: {
                    lat: 40.4378698,
                    lon: -3.8196207
                },
                description: 'Not provided'
            },
            afternoon: [
                {
                    place: 'Not provided',
                    address: 'Not provided',
                    duration: '30min-1hour',
                    position: {
                        lat: 40.4378698,
                        lon: -3.8196207
                    },
                    description: 'Not provided'
                }
            ],
            dinner: {
                place: 'Not provided',
                address: 'Not provided',
                position: {
                    lat: 40.4378698,
                    lon: -3.8196207
                },
                description: 'Not provided'
            }
        }
    ]    
};


const btnCreate = document.getElementById("travelDays1Tab");
btnCreate.addEventListener("change", function(e) {
  e.preventDefault();
  let daySelection = document.getElementById("travelDays1Tab");
  let tabsList = document.querySelector(".tabs ul");
  let contentsDiv = document.querySelector("#contentsDiv");
 
  generateTab(daySelection.value, tabsList, contentsDiv);
});

function generateTab(number, menuContainer, divsContainer) {
     document.querySelectorAll(".day-item").forEach(item =>{
      item.innerHTML=""
     } )
  console.log("ola");
  for(let i = 1; i <=number; i++) {
  let link = `<li class="day-item"><a>Day ${i} </a></li>`;
  menuContainer.innerHTML += link;
  let tab = `<section class="day-item tab-content">
  <div>
      <div class="columns">
          <div class="column">
              <div>
                  <div class="field">
                      <h4>Breakfast</h4>
                      <label class="label">Place</label>
                      <div class="control">
                          <input id="breakfastPlaceDay" class="input" type="text"
                              placeholder="Name of the place">
                      </div>
                  </div>
                  <div class="field">
                      <label class="label">Address</label>
                      <div class="control has-icons-left has-icons-right">
                          <span class="icon is-small is-left">
                              <i class="fas fa-city"></i>
                          </span>
                          <input id="breakfastAddressDay" class="input" type="text"
                              placeholder="Address">
                      </div>
                  </div>
                  <div class="field">
                      <label class="label">Description</label>
                      <div class="control">
                          <textarea id="breakfastDescriptionDay" class="textarea"
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
                          <input id="lunchPlaceDay" class="input" type="text"
                              placeholder="Name of the place">
                      </div>
                  </div>
                  <div class="field">
                      <label class="label">Address</label>
                      <div class="control has-icons-left has-icons-right">
                          <span class="icon is-small is-left">
                              <i class="fas fa-city"></i>
                          </span>
                          <input id="lunchAddressDay" class="input" type="text"
                              placeholder="Address">
                      </div>
                  </div>
                  <div class="field">
                      <label class="label">Description</label>
                      <div class="control">
                          <textarea id="lunchDescriptionDay" class="textarea"
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
                          <input id="name" class="input" type="text" placeholder="Name of the place">
                      </div>
                  </div>
                  <div class="field">
                      <label class="label">Address</label>
                      <div class="control has-icons-left has-icons-right">
                          <span class="icon is-small is-left">
                              <i class="fas fa-city"></i>
                          </span>
                          <input id="lunchAddressDay" class="input" type="text"
                              placeholder="Address">
                      </div>
                  </div>
                  <div class="field">
                      <label class="label">Description</label>
                      <div class="control">
                          <textarea id="dinnerDescriptionDay" class="textarea"
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
                          <input id="name" class="input" type="text" placeholder="Name of the place">
                      </div>
                  </div>
                  <div class="field">
                      <label class="label">Address</label>
                      <div class="control has-icons-left has-icons-right">
                          <span class="icon is-small is-left">
                              <i class="fas fa-city"></i>
                          </span>
                          <input id="city" class="input" type="text" placeholder="Address">
                      </div>
                  </div>
                  <div class="field">
                      <label class="label">Description</label>
                      <div class="control">
                          <textarea id="description" class="textarea"
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
                          <input id="name" class="input" type="text" placeholder="Name of the place">
                      </div>
                  </div>
                  <div class="field">
                      <label class="label">Time</label>
                      <div class="control">
                          <input id="time" class="input" type="text" placeholder="Name of the place">
                      </div>
                  </div>
                  <div class="field">
                      <label class="label">Address</label>
                      <div class="control has-icons-left has-icons-right">
                          <span class="icon is-small is-left">
                              <i class="fas fa-city"></i>
                          </span>
                          <input id="ad" class="input" type="text" placeholder="Address">
                      </div>
                  </div>
                  <div class="field">
                      <label class="label">Description</label>
                      <div class="control">
                          <textarea id="description" class="textarea"
                              placeholder="Describe you plan here"></textarea>
                      </div>
                  </div>
              </div>
          </div>

      </div>
      <div class="field is-grouped">
          <div class="control">
              <button id='submitDescription' class="button is-link">Submit</button>
          </div>
          <div class="control">
              <button href="" class="button is-link is-light">Cancel</button>
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


// <section class="tab-content">
//                 <form>
//                     <div class="columns">
//                         <div class="column">
//                             <div class="column">
//                                 <div class="field">
//                                     <h4>Dinner</h4>
//                                     <label class="label">Place</label>
//                                     <div class="control">
//                                         <input id="name" class="input" type="text" placeholder="Name of the place">
//                                     </div>
//                                 </div>
//                                 <div class="field">
//                                     <label class="label">Address</label>
//                                     <div class="control has-icons-left has-icons-right">
//                                         <span class="icon is-small is-left">
//                                             <i class="fas fa-city"></i>
//                                         </span>
//                                         <input id="city" class="input" type="text" placeholder="Address">
//                                     </div>
//                                 </div>
//                                 <div class="field">
//                                     <label class="label">Description</label>
//                                     <div class="control">
//                                         <textarea id="description" class="textarea" placeholder="Describe you plan here">
//                                                                                     </textarea>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div class="column">
//                         </div>
//                     </div>
//                     <div class="field is-grouped">
//                         <div class="control">
//                             <button id='submitDescription' class="button is-link">Submit</button>
//                         </div>
//                         <div class="control">
//                             <button href="" class="button is-link is-light">Cancel</button>
//                         </div>
//                     </div>
//                 </form>
//             </section>