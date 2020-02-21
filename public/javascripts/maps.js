let markers = []
let initialMarker
let initialCoords = {
        lat: 41.3977381,
        lng: 2.190471916
    },
    myMap





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
    initialMarker = {
        lat: days[0].breakfast.position.lat,
        lng: days[0].breakfast.position.lon
    }
    days.forEach((day, idx) => {
        console.log(`${day.breakfast.position.lat} index ${idx}`)
        // let icon = {
        //     size: new google.maps.Size(71, 71),
        //     origin: new google.maps.Point(0, 0),
        //     anchor: new google.maps.Point(17, 34),
        //     scaledSize: new google.maps.Size(25, 25)
        // }

        const breakfast = {
            lat: day.breakfast.position.lat,
            lng: day.breakfast.position.lon
        }

        markers.push(new google.maps.Marker({
            // icon: icon,
            position: breakfast,
            map: myMap,
            title: days.name
        }))
        const lunch = {
            lat: day.lunch.position.lat,
            lng: day.lunch.position.lon
        }

        markers.push(new google.maps.Marker({
            // icon: icon,
            position: lunch,
            map: myMap,
            title: days.name
        }))
        const dinner = {
            lat: day.dinner.position.lat,
            lng: day.dinner.position.lon
        }

        markers.push(new google.maps.Marker({
            // icon: icon,
            position: dinner,
            map: myMap,
            title: days.name
        }))
        const morning = {
            lat: day.morning[0].position.lat,
            lng: day.morning[0].position.lon
        }

        markers.push(new google.maps.Marker({
            // icon: icon,
            position: morning,
            map: myMap,
            title: days.name
        }))
        const afternoon = {
            lat: day.afternoon[0].position.lat,
            lng: day.afternoon[0].position.lon
        }

        markers.push(new google.maps.Marker({
            // icon: icon,
            position: afternoon,
            map: myMap,
            title: days.name
        }))


    })



}

function initMap() {
    let mapOptions = {
        center: initialCoords,
        zoom: 10
    }
    myMap = new google.maps.Map(document.querySelector('#plansMap'), mapOptions)
    getRestaurants()
}

console.log(initialMarker)



// For each place, get the icon, name and location.
// var bounds = new google.maps.LatLngBounds();
// places.forEach(function (place) {
//     if (!place.geometry) {
//         console.log("Returned place contains no geometry");
//         return;
//     }


//     // Create a marker for each place.
//     markers.push(new google.maps.Marker({
//         map: map,
//         icon: icon,
//         title: place.name,
//         position: place.geometry.location
//     }));

//     if (place.geometry.viewport) {
//         // Only geocodes have viewport.
//         bounds.union(place.geometry.viewport);
//     } else {
//         bounds.extend(place.geometry.location);
//     }
// });
// console.log(markers)
// map.fitBounds(bounds);