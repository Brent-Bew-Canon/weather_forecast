
// "https://api.openweathermap.org/data/2.5/forecast?lat=33.4484&lon=-112.0740&appid=760dc2617eb1a39f1c3c50666743a368"
let weatherApi = "https://api.openweathermap.org/data/2.5/forecast?"
let weatherUrl = ""
let params = {
    q: "",
    limit: "",
    apiKey: "760dc2617eb1a39f1c3c50666743a368"
}
let forecast = [...Array(5)]
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

                //sets time of day for the five day forecast based on time of query
                let dayOne = dayjs.unix(data.list[0].dt)
                dayOneHour = dayjs(dayOne).format("h a")
                forecast[0] = dayjs(dayOne).format("M/DD/YYYY")
                let count = 0

                //loop through all the data to find the correct time each day
                for (let i = 0; i < data.list.length; i++) {
                    let time = dayjs.unix(data.list[i].dt)
                    let parsed = dayjs(time).format("h a")
                    console.log(parsed)

                    //compare the time to the standard set above and add the data to the forecast array if it matches up
                    if (parsed == dayOneHour) {
                        forecast[count] = dayjs(time).format("M/DD/YYYY")
                        count++
                    }
                }
                console.log(forecast)
            })

        document.querySelector("h2").textContent = city.value.toUpperCase()
    }
})

