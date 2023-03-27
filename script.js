
weatherURL = "https://api.openweathermap.org/data/2.5/forecast?lat=33.4484&lon=112.0740&appid=760dc2617eb1a39f1c3c50666743a368"

fetch(weatherURL)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        console.log(data);
    })