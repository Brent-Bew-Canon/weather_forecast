
// "https://api.openweathermap.org/data/2.5/forecast?lat=33.4484&lon=-112.0740&appid=760dc2617eb1a39f1c3c50666743a368"
let weatherApi = "https://api.openweathermap.org/data/2.5/forecast?"
let weatherUrl = ""
let params = {
    q: "",
    limit: "",
    apiKey: "760dc2617eb1a39f1c3c50666743a368"
}
let city = document.querySelector("#city")

// event listener for search button
document.querySelector("#search").addEventListener("click", function () {

    // conditional to stop process if cityname is blank
    if (city.value === "") {
        return
    } else {

        // get the city name from the text input and build out the api url with correct params
        params.q = city.value
        weatherUrl = weatherApi + "q=" + params.q + "&appid=" + params.apiKey
        console.log(weatherUrl)

        // Perform fetch through the weather api
        fetch(weatherUrl)
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                console.log(data.city.sunset)
            })

        document.querySelector("h2").textContent = city.value.toUpperCase()
    }
})

