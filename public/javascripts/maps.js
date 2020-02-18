let initialCoords = {
        lat: 41.3977381,
        lng: 2.190471916
    },
    myMap

function initMap() {
    let mapOptions = {
        center: initialCoords,
        zoom: 5
    }
    myMap = new google.maps.Map(document.querySelector('#plansMap'), mapOptions)
    getRestaurants()
}


function getRestaurants() {

    axios.get("/details/json")
        .then(response => {
            const allRestaurants = response.data
            console.log('el array de restaurantes es:', allRestaurants)
            placeRestaurantsInMap(allRestaurants)
        })
        .catch(error => console.log(error))
}


function placeRestaurantsInMap(restaurants) {
    console.log(restaurants)

    restaurants.forEach(restaurant => {
        let daysArr = restaurant.days
        restaurant.days.forEach((day) => {
            console.log(day.breakfast.position)
            const center = {
                lat: day.breakfast.position.lat,
                lng: day.breakfast.position.lon
            }
            console.log(center)
            new google.maps.Marker({
                position: center,
                map: myMap,
                title: restaurant.name
            })
        })


    })
}