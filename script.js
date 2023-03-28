
// "https://api.openweathermap.org/data/2.5/forecast?lat=33.4484&lon=-112.0740&appid=760dc2617eb1a39f1c3c50666743a368"
let weatherApi = "https://api.openweathermap.org/data/2.5/forecast?"
let weatherUrl = ""
let params = {
    q: "",
    limit: "",
    apiKey: "760dc2617eb1a39f1c3c50666743a368"
}
let forecast = []
let days = []
let city = document.querySelector("#city")
let responseData = 0

// event listener for search button
document.querySelector("#search").addEventListener("click", function () {

    // conditional to stop process if cityname is blank
    if (city.value === "") {
        return
    } else {

        // get the city name from the text input and build out the api url with correct params
        params.q = city.value
        weatherUrl = weatherApi + "q=" + params.q + "&units=imperial&appid=" + params.apiKey
        console.log(weatherUrl)

        // Perform fetch through the weather api
        fetch(weatherUrl)
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                responseData = data
                console.log(responseData)
                console.log(responseData.list[0].dt)
                //sets time of day for the five day forecast based on time of query
                let dayOne = dayjs.unix(data.list[0].dt)
                dayOneHour = dayjs(dayOne).format("h a")
                forecast[0] = dayjs(dayOne).format("M/DD/YYYY")
                days[0] = data.list[0]
                let count = 0

                //loop through all the data to find the correct time each day
                for (let i = 0; i < data.list.length; i++) {
                    let time = dayjs.unix(data.list[i].dt)
                    let parsed = dayjs(time).format("h a")

                    //compare the time to the standard set above and add the data to the forecast array and days array if it matches up
                    if (parsed == dayOneHour) {
                        // console.log(dayjs(time).format("M/DD/YYYY"))
                        forecast[count] = data.list[i].dt
                        days[count] = data.list[i]
                        count++
                    }
                }
                // console.log(forecast)
                console.log(typeof (days))


                //loop to create card elements with weather data
                for (let i = 0; i < 5; i++) {

                    //create elements
                    let div1 = document.createElement("div")
                    let div2 = document.createElement("div")
                    let date = document.createElement("h4")
                    let tempList = document.createElement("ul")
                    let icon = document.createElement("li")
                    let temp = document.createElement("li")
                    let wind = document.createElement("li")
                    let humid = document.createElement("li")
                    let iconImg = document.createElement("img")

                    //set the classes for the elements
                    div1.setAttribute("class", "card m-2 text-white")
                    div2.setAttribute("class", "card-body")
                    date.setAttribute("class", "card-title")

                    //append the elements
                    let cardContain = document.querySelector("#card-container")
                    cardContain.appendChild(div1)
                    div1.appendChild(div2)
                    div2.appendChild(date)
                    div2.appendChild(tempList)
                    tempList.appendChild(icon)
                    icon.appendChild(iconImg)
                    tempList.appendChild(temp)
                    tempList.appendChild(wind)
                    tempList.appendChild(humid)

                    //fill in the elements with the values
                    date.textContent = dayjs.unix(forecast[i]).format("M/DD/YYYY [at ] h a")
                    temp.textContent = "Temp: " + responseData.list[i].main.temp + "°F"
                    wind.textContent = "Wind: " + responseData.list[i].wind.speed + " MPH"
                    humid.textContent = "Humidity: " + responseData.list[i].main.humidity + "%"
                    let iconId = responseData.list[i].weather[0].icon
                    console.log(iconId);
                    iconImg.setAttribute("src", "https://openweathermap.org/img/wn/" + iconId + "@2x.png")


                }
            })
        document.querySelector("h2").textContent = city.value.toUpperCase()
    }
})

