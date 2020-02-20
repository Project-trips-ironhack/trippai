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

    axios.get("/plans/details/api")
        .then(response => {
            const allRestaurants = response.data
            console.log('el array de restaurantes es:', allRestaurants)
            placeRestaurantsInMap(allRestaurants)
        })
        .catch(error => console.log(error))
}


function placeRestaurantsInMap(restaurants) {

    let days = restaurants.days

    days.forEach((day, idx) => {
            console.log(`${day.breakfast.position.lat} index ${idx}`)
        
            const center = {
                lat: day.breakfast.position.lat,
                lng: day.breakfast.position.lon
            }
            new google.maps.Marker({
                position: center,
                map: myMap,
                title: days.name
            })
        })


}