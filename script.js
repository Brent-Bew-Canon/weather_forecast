
let weatherURL = "https://api.openweathermap.org/data/2.5/forecast?lat=33.4484&lon=-112.0740&appid=760dc2617eb1a39f1c3c50666743a368"

let geoApi = "http://api.openweathermap.org/geo/1.0/direct?q=Phoenix&limit=1&appid=760dc2617eb1a39f1c3c50666743a368"

let city = document.querySelector("#city")
document.querySelector("#search").addEventListener("click", function () {
    if (city.value === "") {
        return
    } else {
        fetch(geoApi)
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                console.log("lattitude: " + data[0].lat);
                console.log("longitude: " + data[0].lon);
            })
        document.querySelector("h2").textContent = city.value
    }

})

    // fetch(weatherURL)
    // .then(function (response) {
    //     return response.json()
    // })
    // .then(function (data) {
    //     console.log(data);
    // })