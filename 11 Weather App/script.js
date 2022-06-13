async function getCoordinate(userInput){

    userInput ||= document.querySelector('input#cityName').value
    

    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=5&appid=af974fea2bef8843a98dfed25ae51ac3`)
    const response_json = await response.json()

    let cityIndex = undefined

    if(response_json.length == 0){

        alert(`No result for: ${userInput}`)
        return
    }

    else if(response_json.length == 1){
        cityIndex = 0
    }

    else {

        const stateAndCountry = response_json.map((city, index) => {return `   ${index} => ${city.name},${city.state},${city.country}`})


        while(true){

            cityIndex = prompt(`select an index: ${stateAndCountry}`)

            if (parseInt(cityIndex) < response_json.length && parseInt(cityIndex) >= 0){
    
                break
            }

            alert(`invalid selection! Index must within range 0 to ${response_json.length - 1}`)

        }

    }

    const cityAndCountry = (response_json[cityIndex].local_names == undefined) ? `${response_json[cityIndex].name}, ${response_json[cityIndex].state}` : `${response_json[cityIndex].local_names.en}, ${response_json[cityIndex].country}`

    const cityLatitude = response_json[cityIndex].lat
    const cityLongitude = response_json[cityIndex].lon

    console.log(cityLatitude, cityLongitude)

    const forecast = await getWeather(cityLatitude, cityLongitude) 


    DOMExcludeTemp(cityAndCountry, forecast)


    saveSearchResult(cityLatitude, cityLongitude, cityAndCountry)

}


function saveSearchResult(cityLatitude, cityLongitude, cityAndCountry){

    const lastSearched = dataStore.accessLastSearched()
    lastSearched.lat = cityLatitude
    lastSearched.lon = cityLongitude
    lastSearched.cityAndCountry = cityAndCountry

    dataStore.persist_lastSearch()
    dataStore.appendLocalStorage(cityAndCountry)
    
}


async function getWeather(cityLatitude, cityLongitude){

    let forecast = {}

    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityLatitude}&lon=${cityLongitude}&exclude=minutely&units=metric&appid=af974fea2bef8843a98dfed25ae51ac3`)
    const response_json = await response.json()
    console.log(response_json)

    if(response_json.alerts !== undefined){

        alertTitle = response_json.alerts.map(title => title.event)
        alertBody = response_json.alerts.map(body => body.description)

        forecast.alertTitles = `${(alertTitle.reduce((pre, next) => pre + ', ' + next)).toUpperCase()} WARNING`
        forecast.alertBody = alertBody.reduce((pre, next) => pre + '\n' + next)

        console.log(forecast.alertTitles)
    }
    
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

    uv.textContent = `UV index: ${forecast.uvIndex}`
    humidity.textContent = `Humidity: ${forecast.humidity}%`
    pressure.textContent = `Pressure: ${forecast.pressure} hPa`
    wind.textContent = `Wind Speed: ${forecast.wind} m/s`
    visibility.textContent = `Visibility: ${forecast.visibility / 1000} km`


    // alerts

    const removeAlert = document.querySelector('.alerts')
    if(removeAlert !== null){
        removeAlert.remove()
    }
    

    if(forecast.alertTitles !== undefined){
        const alertDiv = document.createElement('div')
        alertDiv.classList.add('alerts')
        alertDiv.textContent = forecast.alertTitles
        alertDiv.onclick = () => alert(forecast.alertBody)

        const searchBar = document.querySelector('.searchBar')
        searchBar.insertAdjacentElement('afterend', alertDiv)
    }

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

// const test = {lat: 51.0460954, lon: -114.065465, cityAndCountry: 'Calgary, CA'}

function save_localStorage(obj){

    if(localStorage.getItem('LS_cityNames') == null){
        const arr_cityNames = []
        arr_cityNames.push(obj.cityAndCountry)

        localStorage.setItem('LS_cityNames', JSON.stringify(arr_cityNames))
        
    }
    else{

        const arr_cityNames = JSON.parse(localStorage.getItem('LS_cityNames'))
        arr_cityNames.push(obj.cityAndCountry)

        localStorage.setItem('LS_cityNames', JSON.stringify(arr_cityNames))

    }

    localStorage.setItem(obj.cityAndCountry, JSON.stringify(obj))

}


const dataStore = (function (){

    let temperatures = {unit:'c'}
    let lastSearched = {}

    console.log('datastore start')
    return{
        accessTemp: () => {return temperatures},
        accessRecords: () => {return records},
        accessLastSearched: () => {return lastSearched},

        appendLocalStorage: (cityName) => {

            LS_Cities = JSON.parse(localStorage.getItem('LS_cityNames'))

            if(LS_Cities.includes(cityName)){
                return
            }

            LS_Cities.push(cityName)
            localStorage.setItem('LS_cityNames', JSON.stringify(LS_Cities))
        },

        persist_lastSearch: () => {
            const coordinate = JSON.stringify(lastSearched)
            localStorage.setItem('lastSearched', coordinate)
        }
    }
})()

const Load_LocalStorage = (async function (){

    if(localStorage.getItem('lastSearched') == null){
        getCoordinate('hefei')
    }
    else{
        const coordinate = JSON.parse(localStorage.getItem('lastSearched'))
        forecast = await getWeather(coordinate.lat, coordinate.lon) 
        DOMExcludeTemp(coordinate.cityAndCountry, forecast)
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


function displayHistory(){
    
    const searchHistory = JSON.parse(localStorage.getItem('LS_cityNames'))

    const container = document.querySelector('.bar')
    const history = document.createElement('div')
    history.classList.add('history')
    const ul = document.createElement('ul')

    document.body.addEventListener('click', (e) => {

        if(e.target.tagName != 'INPUT' && !e.target.classList.contains('removeLi')){
            history.style.display = 'none'
        }
    })

    searchHistory.forEach(item => {

        const listBox = document.createElement('div')
        listBox.classList.add('listBox')
        const li = document.createElement('li')
        const btn = document.createElement('button')

        li.classList.add('list')
        li.textContent = item
        li.onclick = async function loadHistory(){
            
            cityName = this.textContent
            cityObj = JSON.parse(localStorage.getItem(cityName))

            forecast = await getWeather(cityObj.lat, cityObj.lon) 
            DOMExcludeTemp(cityObj.cityAndCountry, forecast)

            history.style.display = 'none'
        }

        btn.type = 'button'
        btn.classList.add('removeLi')
        btn.textContent = 'Remove'

        btn.onclick = function removeRecord(){
            
            const cityName = this.parentElement.firstChild.textContent
            const LS_Cities = JSON.parse(localStorage.getItem('LS_cityNames'))
            const index = LS_Cities.indexOf(cityName)

            LS_Cities.splice(index, 1)
            localStorage.setItem('LS_cityNames', JSON.stringify(LS_Cities))


            this.parentElement.remove()

        }

        listBox.append(li)
        listBox.append(btn)
        ul.append(listBox)
    })

    history.append(ul)
    container.append(history)

}



(function listener(){

    const searchBtn = document.querySelector('#cityName')

    searchBtn.addEventListener('keydown',(e) => {
       
        if(e.key == 'Enter'){getCoordinate()}

    })

    searchBtn.addEventListener('click', displayHistory)

})()


