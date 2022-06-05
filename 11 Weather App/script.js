async function getCoordinate(input){

    input ||= document.querySelector('input#cityName').value

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

    const cityAndCountry = `${response_json[cityIndex].local_names.en}, ${response_json[cityIndex].country}`

    const cityLatitude = response_json[cityIndex].lat
    const cityLongitude = response_json[cityIndex].lon

    console.log(cityLatitude, cityLongitude)

    const forecast = await getWeather(cityLatitude, cityLongitude) 

    createDOM(cityAndCountry, forecast)

    

}


async function getWeather(cityLatitude, cityLongitude){

    let forecast = {}

    // https://api.openweathermap.org/data/2.5/onecall? &exclude=hourly,minutely,alerts&units=metric&appid=af974fea2bef8843a98dfed25ae51ac3
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityLatitude}&lon=${cityLongitude}&exclude=hourly,minutely,alerts&units=metric&appid=af974fea2bef8843a98dfed25ae51ac3`)
    const response_json = await response.json()


    const currentCondition = response_json.current.weather[0].description
    const iconCurrent = response_json.current.weather[0].icon

    const tempNow = Math.round(response_json.daily[0].temp.day) 
    const tempMin = Math.round(response_json.daily[0].temp.min)
    const tempMax = Math.round(response_json.daily[0].temp.max)
    const feels_like = Math.round(response_json.daily[0].feels_like.day)

    const humidity = response_json.daily[0].humidity
    const uvIndex = Math.round(response_json.current.uvi)
    const pressure = response_json.current.pressure
    const visibility = response_json.current.visibility
    const windSpeed = response_json.current.wind_speed


    const futureDaysMin = response_json.daily.map((el) => Math.round(el.temp.min))
    const futureDaysMax = response_json.daily.map((el) => Math.round(el.temp.max))
    const futureDaysDescription = response_json.daily.map((el) => el.weather[0].description)
    const futureDaysIcon = response_json.daily.map((el) => el.weather[0].icon)



    const timeZone = response_json.timezone
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: `${timeZone}`,
        weekday: 'long',
        month: "long",
        day: "numeric",
        hour: 'numeric', 
        minute: 'numeric'
    })
    // Asia/Shanghai
    const dateTimeObj = formatter.formatToParts(new Date())

    const weekday = dateTimeObj[0].value
    const localDate = `${dateTimeObj[2].value} ${dateTimeObj[4].value}`
    const localTime = `${dateTimeObj[6].value}:${dateTimeObj[8].value} ${dateTimeObj[10].value} `

    forecast.timeZone = timeZone
    forecast.currentCondition = currentCondition
    forecast.iconCurrent = iconCurrent
    forecast.tempNow = tempNow
    forecast.tempMin = tempMin
    forecast.tempMax = tempMax
    forecast.feels_like = feels_like
    forecast.humidity = humidity
    forecast.uvIndex = uvIndex
    forecast.pressure = pressure
    forecast.visibility = visibility
    forecast.wind = windSpeed

    forecast.futureDaysMin = futureDaysMin
    forecast.futureDaysMax = futureDaysMax
    forecast.futureDaysDescription = futureDaysDescription
    forecast.futureDaysIcon = futureDaysIcon

    forecast.date = `${weekday}, ${localDate}`
    forecast.currentTime = localTime

    console.log(forecast)
    return forecast

}


function futureDatTime(timeZone){

    let DateObj = {}
    DateObj.weekday = []
    DateObj.monthDay = []
  
    const today = new Date()
  
    for(let i = 0; i < 7; i++){
      
  
      let weekday = today.toLocaleString('en-US', {
  
        timeZone: `${timeZone}`,
        weekday: 'short'
      })
    
      let monthDay = today.toLocaleString('en-US', {
    
        timeZone: 'Asia/Shanghai',
        month: "short",
        day: "numeric",
      })
  
      DateObj.weekday.push(weekday)
      DateObj.monthDay.push(monthDay)
  
      today.setDate(today.getDate() + 1)
    }
  
    return DateObj
  
}


function createDOM(cityAndCountry, forecast){

    const title = document.querySelector('.title')
    const date = document.querySelector('.date')
    const temp = document.querySelector('.temp')
    const currentCondition = document.querySelector('.currentCondition')
    const imgCondition = document.querySelector('.imgCondition')

    
    const uv = document.querySelector('.uv')
    const humidity = document.querySelector('.humidity')
    const pressure = document.querySelector('.pressure')
    const feels_like = document.querySelector('.feels_like')
    const wind = document.querySelector('.wind')
    const visibility = document.querySelector('.visibility')

    title.textContent = cityAndCountry
    date.textContent = `${forecast.currentTime} ${forecast.date}`

    temp.textContent = `${forecast.tempNow} \u2103`
    currentCondition.textContent = `Condition: ${forecast.currentCondition}`
    imgCondition.src = `./icons/${forecast.iconCurrent}.svg`

    uv.textContent = `UV Index: ${forecast.uvIndex}`
    humidity.textContent = `Humidity: ${forecast.humidity}`
    pressure.textContent = `Pressure: ${forecast.pressure} hPa`
    feels_like.textContent = `Feels like: ${forecast.feels_like} \u2103`
    wind.textContent = `Wind Speed: ${forecast.wind} m/s`
    visibility.textContent = `Visibility: ${forecast.visibility / 1000} km`


    // forecast elements:

    const futureDate = futureDatTime(forecast.timeZone)

    const forecast_weekday = document.querySelectorAll('.forecast_weekday')
    forecast_weekday.forEach((item, idx) => {
        item.textContent = futureDate.weekday[idx]
    })

    const forecast_date = document.querySelectorAll('.forecast_date')
    forecast_date.forEach((item, idx) => {
        item.textContent = futureDate.monthDay[idx]
    })

    const forecast_icon = document.querySelectorAll('.forecast_icon')
    forecast_icon.forEach((icon, idx) => {
        icon.src = `./icons/${forecast.futureDaysIcon[idx]}.svg`
    })

    
    const forecast_tempMax = document.querySelectorAll('.tempMax')
    forecast_tempMax.forEach((tempMax, idx) => {
        tempMax.textContent = forecast.futureDaysMax[idx]
    })

    const forecast_tempMin = document.querySelectorAll('.tempMin')
    forecast_tempMin.forEach((tempMin, idx) => {
        tempMin.textContent = forecast.futureDaysMin[idx]
    })

    const forecast_condition = document.querySelectorAll('.forecast_condition')
    forecast_condition.forEach((condition, idx) => {
        condition.textContent = forecast.futureDaysDescription[idx]
    })



}

(function listener(){

    const searchBtn = document.querySelector('#cityName')

    searchBtn.addEventListener('keydown',(e) => {
       
        if(e.key == 'Enter'){getCoordinate()}

    })
})()

getCoordinate('chongqing')
