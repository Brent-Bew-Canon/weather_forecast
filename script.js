
// "https://api.openweathermap.org/data/2.5/forecast?lat=33.4484&lon=-112.0740&appid=760dc2617eb1a39f1c3c50666743a368"
let weatherApi = "https://api.openweathermap.org/data/2.5/forecast?"
let weatherUrl = ""
let params = {
    q: "",
    limit: "",
    apiKey: "760dc2617eb1a39f1c3c50666743a368"
}
let forecast = []
let allDates = []
let temps = []
let windList = []
let humidity = []
icons = []

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

                let relDates = []
                for (let i = 0; i < data.list.length; i++) {
                    if (dayjs.unix(data.list[i].dt).format("M/DD") > dayjs.unix(data.list[0].dt).format("M/DD")) {
                        console.log("greater day" + dayjs.unix(data.list[i].dt).format("M/DD"))
                        relDates.push(data.list[i])
                    } else {
                        console.log("not greater" + dayjs.unix(data.list[i].dt).format("M/DD"))
                    }
                    allDates[i] = data.list[i]
                }


                let dayOne = dayjs.unix(relDates[0].dt)
                dayOneHour = dayjs(dayOne).format("h a")
                console.log(dayOneHour + "see herer")
                forecast[0] = dayjs(dayOne).format("M/DD/YYYY")
                console.log(forecast[0])
                console.log(relDates)
                let count = 0
                for (let i = 0; i < relDates.length; i++) {
                    let time = dayjs.unix(relDates[i].dt)
                    let parsed = dayjs(time).format("h a")
                    let dayTime = dayjs(time).format("M/DD/YYYY [at ] h a")


                    //compare the time to the standard set above and add the data to the forecast array and fiveDays array if it matches up
                    if (parsed == dayOneHour) {
                        console.log("This is a good day" + dayjs(time).format("M/DD/YYYY"))
                        temps.push(relDates[i].main.temp)
                        windList.push(relDates[i].wind.speed)
                        console.log(windList[count])
                        humidity.push(relDates[i].main.humidity)
                        icons.push(relDates[i].weather[0].icon)
                        forecast[count] = dayjs.unix(relDates[i].dt).format("M/DD/YYYY")
                        count++
                    }
                }
                console.log(relDates)
                console.log(forecast)


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
                    date.textContent = forecast[i]
                    temp.textContent = "Temp: " + temps[i] + "°F"
                    wind.textContent = "Wind: " + windList[i] + " MPH"
                    humid.textContent = "Humidity: " + humidity[i] + "%"
                    let iconId = icons[i]
                    console.log(iconId);
                    iconImg.setAttribute("src", "https://openweathermap.org/img/wn/" + iconId + "@2x.png")


                }
            })

        document.querySelector("h2").textContent = city.value.toUpperCase()
    }
})

