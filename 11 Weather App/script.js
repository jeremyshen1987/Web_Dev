async function getCoordinate(){

    const input = document.querySelector('input#cityName').value

    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=af974fea2bef8843a98dfed25ae51ac3`)
    const response_json = await response.json()

    console.log(response_json)
    console.log(response.status)

    let cityIndex = undefined

    if(response_json.length == 0){

        alert(`No result for: ${input}`)
        return
    }

    else if(response_json.length == 1){
        cityIndex = 0
    }

    else {

        const stateAndCountry = response_json.map((city, index) => {return `   ${index} => ${city.name},${city.state},${city.country}`})

        cityIndex = prompt(`select an index: ${stateAndCountry}`)
        
        console.log(cityIndex)

        if (parseInt(cityIndex) > response_json.length || parseInt(cityIndex) < 0){
    
            alert('invalid selection! Please search again')
            return
        }

    }


    const cityLatitude = response_json[cityIndex].lat
    const cityLongitude = response_json[cityIndex].lon

    console.log(cityLatitude, cityLongitude)

    const forecast = await getWeather(cityLatitude, cityLongitude) 

    console.log(forecast)
}


async function getWeather(cityLatitude, cityLongitude){

    let forecast = {}

    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityLatitude}&lon=${cityLongitude}&exclude=hourly,minutely,alerts&units=metric&appid=af974fea2bef8843a98dfed25ae51ac3`)
    const response_json = await response.json()

    const currentCondition = response_json.current.weather[0].main


    const tempNow = response_json.daily[0].temp.day
    const tempMin = response_json.daily[0].temp.min
    const tempMax = response_json.daily[0].temp.max
    const feels_like = response_json.daily[0].feels_like.day
    const humidity = response_json.daily[0].humidity
    const uvIndex = response_json.current.uvi
    const visibility = response_json.current.visibility


    const timezoneOffset = response_json.timezone_offset

    const todayDate = new Date(Date.now() + timezoneOffset * 1000)

    const weekday = todayDate.toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric"
    });


    const currentHour = todayDate.getUTCHours()
    const currentMinute = todayDate.getUTCMinutes()

    forecast.currentCondition = currentCondition
    forecast.tempNow = tempNow
    forecast.tempMin = tempMin
    forecast.tempMax = tempMax
    forecast.feels_like = feels_like
    forecast.humidity = humidity
    forecast.uvIndex = uvIndex
    forecast.visibility = visibility

    forecast.date = weekday
    forecast.currentTime = `${currentHour}:${currentMinute}`

    return forecast


}


(function listener(){

    const searchBtn = document.querySelector('#cityName')

    searchBtn.addEventListener('keydown',(e) => {
       
        if(e.key == 'Enter'){getCoordinate()}

    })
})()

// function createDOM(){

//     const container = document.querySelector('.container')



// }