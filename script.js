
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
let cityname = ""

let city = document.querySelector("#city")
let currentTemp = document.querySelector("#current-temp")
let currentWind = document.querySelector("#current-wind")
let currentHumidity = document.querySelector("#current-humidity")
let currentIcon = document.querySelector("#current-icon")
let historyArea = document.querySelector("#history-area")
let cardContain = document.querySelector("#card-container")



// main use function to get weather
function runFetch(event) {

    // conditional to stop process if cityname is blank
    if (city.value === "") {
        return
    } else {
        if (event.target.id == "search") {
            params.q = city.value
        } else {
            params.q = event.target.textContent
        }

        // get the city name from the text input and build out the api url with correct params
        params.q = city.value
        weatherUrl = weatherApi + "q=" + params.q + "&units=imperial&appid=" + params.apiKey

        // Perform fetch through the weather api
        fetch(weatherUrl)
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                console.log(data)

                //save correct name of city to variable
                cityname = data.city.name
                console.log(cityname)

                // this loop compares each data point against the first data point based on the day to get a list of all the 5 days beyond today
                let relDates = []
                for (let i = 0; i < data.list.length; i++) {
                    if (dayjs.unix(data.list[i].dt).format("M/DD") > dayjs.unix(data.list[0].dt).format("M/DD")) {
                        relDates.push(data.list[i])
                    }
                    allDates[i] = data.list[i]
                }

                //TODO: explain this paragraph
                let dayOne = dayjs.unix(relDates[0].dt)
                dayOneHour = dayjs(dayOne).format("h a")
                forecast[0] = dayjs(dayOne).format("M/DD/YYYY")

                //this loop goes through each of the 5 day forecast and formats it by the hour to determine which data points to grab so that they are all consistent by hour
                let count = 0
                for (let i = 0; i < relDates.length; i++) {
                    let time = dayjs.unix(relDates[i].dt)
                    let parsed = dayjs(time).format("h a")

                    //compares the hour against the first day/hour combo set above as dayOneHour and adds the data to the arrays if it matches up
                    if (parsed == dayOneHour) {
                        temps.push(relDates[i].main.temp)
                        windList.push(relDates[i].wind.speed)
                        humidity.push(relDates[i].main.humidity)
                        icons.push(relDates[i].weather[0].icon)
                        forecast[count] = dayjs.unix(relDates[i].dt).format("M/DD/YYYY")
                        count++
                    }
                }

                //loop to create card elements and fill them with weather data
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
                    iconImg.setAttribute("src", "https://openweathermap.org/img/wn/" + iconId + "@2x.png")

                }
                //fill in the weather elements with values for today
                document.querySelector("h2").textContent = data.city.name + "(" + dayjs.unix(allDates[0].dt).format("M/DD/YYYY") + ")"
                currentTemp.textContent = "Temp: " + allDates[0].main.temp + "°"
                currentWind.textContent = "Wind: " + allDates[0].wind.speed + " MPH"
                currentHumidity.textContent = "Humidity: " + allDates[0].main.humidity + "%"
                currentIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + allDates[0].weather[0].icon + "@2x.png")

                // TODO: Save previous search history to screen

                //create and append history button and add class attributes
                searchHistory = document.createElement("button")
                historyArea.appendChild(searchHistory)
                searchHistory.textContent = cityname
                searchHistory.setAttribute("class", "history-button btn btn-secondary col-12 mt-3")

                searchHistory.addEventListener("click", runFetch)
                // Add event Listener that 

                //TODO: Click on history runs the new search

                //TODO: Add functionality if city is not found


                //TODO: Delete cards when button is clicked


            })


    }
}

// event listener for search button



document.querySelector("#search").addEventListener("click", runFetch)



