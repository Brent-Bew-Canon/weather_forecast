
// "https://api.openweathermap.org/data/2.5/forecast?lat=33.4484&lon=-112.0740&appid=760dc2617eb1a39f1c3c50666743a368"
let weatherApi = "https://api.openweathermap.org/data/2.5/forecast?"
let geoApi = "http://api.openweathermap.org/geo/1.0/direct?"
let geoUrl = ""
let weatherUrl = ""
let params = {
    q: "",
    limit: "",
    lat: 0,
    lon: 0,
    apiKey: "760dc2617eb1a39f1c3c50666743a368"
}
let city = document.querySelector("#city")

// event listener for search button
document.querySelector("#search").addEventListener("click", function () {
    if (city.value === "") {
        return
    } else {
        // get the city name from the text input and build out the geoapi url with correct params
        geoParams.q = city.value
        geoUrl = geoApi + "q=" + params.q + "&limit=" + params.limit + "&appid=" + params.apiKey
        console.log(geoUrl)

        // Perform fetch through the geoapi with the city name to get long. and lat.
        fetch(geoUrl)
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {

                // update the longitude and latitude parameters for the weather api url
                weatherParams.lat = data[0].lat
                weatherParams.lon = data[0].lon

                //build the weather api url
                weatherUrl = weatherApi + "lat=" + params.lat + "&lon=" + params.lon + "&appid=" + params.apiKey
                console.log(weatherUrl)
            })
        fetch(weatherUrl)
            .then(function (response) {
                console.log("response below")
                console.log(response)
                return response.json()
            })
            .then(function (data) {
                console.log(data)
            })

        document.querySelector("h2").textContent = city.value.toUpperCase()
    }

})

    // fetch(weatherURL)
    // .then(function (response) {
    //     return response.json()
    // })
    // .then(function (data) {
    //     console.log(data);
    // })