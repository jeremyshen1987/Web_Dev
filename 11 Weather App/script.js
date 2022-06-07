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

    DOMExcludeTemp(cityAndCountry, forecast)

}


async function getWeather(cityLatitude, cityLongitude){

    let forecast = {}

    // https://api.openweathermap.org/data/2.5/onecall? &exclude=hourly,minutely,alerts&units=metric&appid=af974fea2bef8843a98dfed25ae51ac3
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityLatitude}&lon=${cityLongitude}&exclude=hourly,minutely,alerts&units=metric&appid=af974fea2bef8843a98dfed25ae51ac3`)
    const response_json = await response.json()


    const currentCondition = response_json.current.weather[0].description
    const iconCurrent = response_json.current.weather[0].icon

    const tempNow = Math.round(response_json.daily[0].temp.day) 
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

    const dateTimeObj = formatter.formatToParts(new Date())

    const weekday = dateTimeObj[0].value
    const localDate = `${dateTimeObj[2].value} ${dateTimeObj[4].value}`
    const localTime = `${dateTimeObj[6].value}:${dateTimeObj[8].value} ${dateTimeObj[10].value} `

    forecast.timeZone = timeZone
    forecast.currentCondition = currentCondition
    forecast.iconCurrent = iconCurrent
    forecast.tempNow = `${tempNow}\u2103`
    forecast.humidity = humidity
    forecast.uvIndex = uvIndex
    forecast.pressure = pressure
    forecast.visibility = visibility
    forecast.wind = windSpeed

    forecast.futureDaysDescription = futureDaysDescription
    forecast.futureDaysIcon = futureDaysIcon

    forecast.date = `${weekday}, ${localDate}`
    forecast.currentTime = localTime

    dataStore.accessTemp().tempNow = tempNow
    dataStore.accessTemp().futureDaysMin = futureDaysMin
    dataStore.accessTemp().futureDaysMax = futureDaysMax
    dataStore.accessTemp().feels_like = feels_like

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
    
        timeZone: `${timeZone}`,
        month: "short",
        day: "numeric",
      })
  
      DateObj.weekday.push(weekday)
      DateObj.monthDay.push(monthDay)
  
      today.setDate(today.getDate() + 1)
    }
  
    return DateObj
  
}


function DOMExcludeTemp(cityAndCountry, forecast){

    const title = document.querySelector('.title')
    const date = document.querySelector('.date')
    
    const currentCondition = document.querySelector('.currentCondition')
    const imgCondition = document.querySelector('.imgCondition')

    
    const uv = document.querySelector('.uv')
    const humidity = document.querySelector('.humidity')
    const pressure = document.querySelector('.pressure')
    
    const wind = document.querySelector('.wind')
    const visibility = document.querySelector('.visibility')

    title.textContent = cityAndCountry
    date.textContent = `${forecast.currentTime} ${forecast.date}`

    
    currentCondition.textContent = `Condition: ${capitalize(forecast.currentCondition)}`
    imgCondition.src = `./icons/${forecast.iconCurrent}.svg`

    uv.textContent = `UV Index: ${forecast.uvIndex}`
    humidity.textContent = `Humidity: ${forecast.humidity}%`
    pressure.textContent = `Pressure: ${forecast.pressure} hPa`
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

    const forecast_condition = document.querySelectorAll('.forecast_condition')
    forecast_condition.forEach((condition, idx) => {
        condition.textContent = capitalize(forecast.futureDaysDescription[idx])
    })

    DOM_Temperature()
}

function DOM_Temperature(){
    
    const temperatures = dataStore.accessTemp()
    let unit = (temperatures.unit == 'c') ? '\u2103' : '\u2109'

    const temp = document.querySelector('.temp')
    const feels_like = document.querySelector('.feels_like')
    const forecast_tempMax = document.querySelectorAll('.tempMax')
    const forecast_tempMin = document.querySelectorAll('.tempMin')

    if(temperatures.unit == 'c'){

        temp.textContent = `${temperatures.tempNow} ${unit}`
        feels_like.textContent = `Feels like: ${temperatures.feels_like}${unit}`

        forecast_tempMax.forEach((tempMax, idx) => {
            tempMax.textContent = `${temperatures.futureDaysMax[idx]}${unit}`
        })
    
        forecast_tempMin.forEach((tempMin, idx) => {
            tempMin.textContent = `${temperatures.futureDaysMin[idx]}${unit}`
        })
        
    }
    else{

        temp.textContent = `${toFahrenheit(temperatures.tempNow)} ${unit}`
        feels_like.textContent = `Feels like: ${toFahrenheit(temperatures.feels_like)}${unit}`

        forecast_tempMax.forEach((tempMax, idx) => {
            tempMax.textContent = `${toFahrenheit(temperatures.futureDaysMax[idx])}${unit}`
        })
    
        forecast_tempMin.forEach((tempMin, idx) => {
            tempMin.textContent = `${toFahrenheit(temperatures.futureDaysMin[idx])}${unit}`
        })

    }

}

getCoordinate('hefei')


const dataStore = (function (){

    let temperatures = {unit:'c'}

    console.log('datastore start')
    return{
        accessTemp: () => {return temperatures},
    }
})()


function toggle(){

    const data = dataStore.accessTemp()
    data.unit = (data.unit == 'c') ? 'f' : 'c'
    DOM_Temperature()

    const unitBtn = document.querySelector('.celsiusFahrenheitConvertion')
    unitBtn.textContent = (data.unit == 'c') ? '\u2109' : '\u2103'

}


function toFahrenheit(c){
    return Math.round((c * 9 / 5) + 32)
}

function capitalize(string){
    return string[0].toUpperCase() + string.slice(1)
}

(function listener(){

    const searchBtn = document.querySelector('#cityName')

    searchBtn.addEventListener('keydown',(e) => {
       
        if(e.key == 'Enter'){getCoordinate()}

    })
})()



