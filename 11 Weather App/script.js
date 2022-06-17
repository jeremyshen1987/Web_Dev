async function getCoordinate(userInput){

    userInput ||= document.querySelector('input#cityName').value
    

    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=5&appid=af974fea2bef8843a98dfed25ae51ac3`)
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

    const forecast = await getWeather(cityLatitude, cityLongitude) 
    Object.assign(dataStore.accessForecast(), forecast)

    DOM_Main(cityAndCountry, forecast)
    DOM_forecastDaily(forecast)
    DOM_forecastHourly()

    saveSearchResult(cityLatitude, cityLongitude, cityAndCountry)

}


function saveSearchResult(cityLatitude, cityLongitude, cityAndCountry){

    const lastSearched = dataStore.accessLastSearched()
    lastSearched.lat = cityLatitude
    lastSearched.lon = cityLongitude
    lastSearched.cityAndCountry = cityAndCountry

    dataStore.saveCoordinate()
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

    const epochTime = response_json.hourly.map((el) => el.dt)
    const hourlyTemp = response_json.hourly.map((el) => Math.round(el.temp))
    const hourlyHumidity = response_json.hourly.map((el) => Math.round(el.humidity))
    const hourlyUV = response_json.hourly.map((el) => Math.round(el.uvi))
    const hourlyPrecipitation = response_json.hourly.map((el) => parseInt(el.pop * 100))
    const hourlyDescription = response_json.hourly.map((el) => el.weather[0].description)
    const hourlyIcon = response_json.hourly.map((el) => el.weather[0].icon)


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

    forecast.unit = 'c'
    forecast.timeZone = timeZone
    forecast.currentCondition = currentCondition
    forecast.iconCurrent = iconCurrent
    forecast.tempNow = `${tempNow}`
    forecast.humidity = humidity
    forecast.uvIndex = uvIndex
    forecast.pressure = pressure
    forecast.visibility = visibility
    forecast.wind = windSpeed

    forecast.futureDaysMin = futureDaysMin
    forecast.futureDaysMax = futureDaysMax
    forecast.feels_like = feels_like
    forecast.futureDaysDescription = futureDaysDescription
    forecast.futureDaysIcon = futureDaysIcon

    //hourly 
    forecast.hours = epochTime.map((EpochTime) => epochConversion(timeZone, EpochTime).hour)
    forecast.hourlyWeekday = epochTime.map((EpochTime) => epochConversion(timeZone, EpochTime).weekday)
    forecast.hourlyIcon = hourlyIcon
    forecast.hourlyTemp = hourlyTemp.map((temp) => `${temp} \u2103`)
    forecast.hourlyTempFahrenheit = hourlyTemp.map((temp) => `${toFahrenheit(temp)} \u2109`)
    forecast.hourlyDescription = hourlyDescription
    forecast.hourlyPrecipitation = hourlyPrecipitation

    ///////
    forecast.date = `${weekday}, ${localDate}`
    forecast.currentTime = localTime

    return forecast

}


function epochConversion(timeZone, EpochTime){

    let TimeObj = {}

    const epochTime = new Date(EpochTime * 1000)

    const dateHour = epochTime.toLocaleString('en-US', {
    
        timeZone: `${timeZone}`,
        weekday: 'short',
        hour: "numeric"
    })

    TimeObj.weekday = dateHour.split(', ')[0]
    TimeObj.hour = dateHour.split(', ') [1]

    return TimeObj
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


function DOM_Main(cityAndCountry, forecast){

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

    
    DOM_Temperature()
}

function DOM_forecastDaily(forecast){

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

}


function DOM_slider(){

    const arrLength = 48
    const pageNum = Math.ceil(arrLength / 7) 

    const backwardBtn = document.createElement('button')
    backwardBtn.classList.add('backward')
    backwardBtn.textContent = '\u276E'
    backwardBtn.onclick = () => slider.backward()

    const forwardBtn = document.createElement('button')
    forwardBtn.classList.add('forward')
    forwardBtn.textContent = '\u276F'
    forwardBtn.onclick = () => slider.forward()

    const container = document.querySelector('.slider_main')
    container.append(backwardBtn)

    for(let i = 0; i < pageNum; i += 1){

        const pageIndicator = document.createElement('button')
        pageIndicator.dataset.key = i
        pageIndicator.classList.add('sliderDot')
        pageIndicator.textContent = '\u2218'

        container.append(pageIndicator)
        
        pageIndicator.onclick = (e) => {

            const Buttons = document.querySelectorAll('.sliderDot')
            Buttons.forEach((btn) => {
                btn.textContent = '\u2218'
            })
            
            e.target.textContent = '\u25CF'
            slider.setIndex(i * 7)
            DOM_forecastHourly(i * 7, i * 7 + 7)
        }
        
        if (i == 0){
            pageIndicator.textContent = '\u25CF'
        }
        
    }

    container.append(forwardBtn)

}

function DOM_forecastHourly(left = 0, right = 7){

    try {
        const forecast = dataStore.accessForecast()
        
        const hours = forecast.hours.slice(left, right)
        const hourlyWeekday = forecast.hourlyWeekday.slice(left, right)
        const hourlyIcon = forecast.hourlyIcon.slice(left, right)
        const hourlyTemp = (forecast.unit == 'c') ? forecast.hourlyTemp.slice(left, right) : forecast.hourlyTempFahrenheit.slice(left, right)
        const hourlyPrecipitation = forecast.hourlyPrecipitation.slice(left, right)
        const hourlyDescription = forecast.hourlyDescription.slice(left, right)

        const weekdayDOM = document.querySelectorAll('.hourly_weekday')
        weekdayDOM.forEach((item, idx) => {
            item.textContent = hourlyWeekday[idx]
        })

        const hoursDOM = document.querySelectorAll('.hourly_hours')
        hoursDOM.forEach((item, idx) => {
            item.textContent = hours[idx]
        })

        const iconDOM = document.querySelectorAll('.hourly_icon')
        iconDOM.forEach((icon, idx) => {
            icon.src = `./icons/${hourlyIcon[idx]}.svg`
        })

        const tempDOM = document.querySelectorAll('.hourlyTemp')
        tempDOM.forEach((item, idx) => {
            item.textContent = hourlyTemp[idx]
        })

        const rainDOM = document.querySelectorAll('.rainProb')
        rainDOM.forEach((item, idx) => {
            /// reset textContent to prevent text carryover.
            item.textContent = ''
            item.classList.remove('rainProb_mod')
            item.parentElement.classList.remove('hourly_cell_mod')
            item.textContent = (hourlyPrecipitation[idx] >= 30) ? `${hourlyPrecipitation[idx]}%` : ''
            if(hourlyPrecipitation[idx] >= 30){
                item.classList.add('rainProb_mod')
                item.parentElement.classList.add('hourly_cell_mod')
            }
        })

        const conditionDOM = document.querySelectorAll('.hourly_condition')
        conditionDOM.forEach((item, idx) => {
            /// reset textContent to prevent text carryover.
            item.textContent = ''
            item.classList.remove('hourly_condition_mod')
            item.textContent = (hourlyPrecipitation[idx] >= 30) ? 'Chance of rain' : capitalize(hourlyDescription[idx])
            if(hourlyPrecipitation[idx] >= 30){
                item.classList.add('hourly_condition_mod')
            }
        })

        if(left == 0){

            slider.resetIndex()

            const Buttons = [...document.querySelectorAll('.sliderDot')]
            Buttons.forEach((btn) => {
                btn.textContent = '\u2218'
            })
            Buttons[0].textContent = '\u25CF'
        }

    }
    catch (e){
        console.log(e)
    }

}


const slider = (function (){

    let index = 0

    return {

        setIndex: (x) => {index = x},
        getIndex: () => {return index},
        resetIndex: () => {index = 0},

        displayDefault: function(){

            DOM_forecastHourly(0, 7)
        },

        forward: function(){
            
            const arr = dataStore.accessForecast().hours
            const pageNum = Math.ceil(arr.length / 7)

            if(index + 7 > arr.length -1){
                DOM_forecastHourly(index, arr.length)
                index = (pageNum - 1) * 7
            }
            else{
                index += 7
                DOM_forecastHourly(index, index + 7)
            }
            
            this.highlight()
        },

        backward: function(){

            if(index - 7 < 0){
                DOM_forecastHourly(0, 7)
            }
            else{
                index -= 7
                DOM_forecastHourly(index, index + 7)
            }
            this.highlight()
        },

        highlight: function(){
            const Buttons = document.querySelectorAll('.sliderDot')
            Buttons.forEach((btn) => {
                btn.textContent = (btn.dataset.key == index / 7) ? '\u25CF' : '\u2218'
            })

        }
    }
})()

function DOM_Temperature(){
    
    const forecast = dataStore.accessForecast()
    let unit = (forecast.unit == 'c') ? '\u2103' : '\u2109'

    const temp = document.querySelector('.temp')
    const feels_like = document.querySelector('.feels_like')
    const forecast_tempMax = document.querySelectorAll('.tempMax')
    const forecast_tempMin = document.querySelectorAll('.tempMin')

    //hourly
    const hourlyTemp = document.querySelectorAll('.hourlyTemp')
    const index = slider.getIndex()
    const arrLength = forecast.hourlyTemp.length


    if(forecast.unit == 'c'){

        temp.textContent = `${forecast.tempNow} ${unit}`
        feels_like.textContent = `Feels like: ${forecast.feels_like}${unit}`

        forecast_tempMax.forEach((tempMax, idx) => {
            tempMax.textContent = `${forecast.futureDaysMax[idx]}${unit}`
        })
    
        forecast_tempMin.forEach((tempMin, idx) => {
            tempMin.textContent = `${forecast.futureDaysMin[idx]}${unit}`
        })

        hourlyTemp.forEach((temp, idx) => {
            temp.textContent = ((index + idx) >= arrLength) ? '' : `${forecast.hourlyTemp[index + idx]}`
        })
        
    }
    else{

        temp.textContent = `${toFahrenheit(forecast.tempNow)} ${unit}`
        feels_like.textContent = `Feels like: ${toFahrenheit(forecast.feels_like)}${unit}`

        forecast_tempMax.forEach((tempMax, idx) => {
            tempMax.textContent = `${toFahrenheit(forecast.futureDaysMax[idx])}${unit}`
        })
    
        forecast_tempMin.forEach((tempMin, idx) => {
            tempMin.textContent = `${toFahrenheit(forecast.futureDaysMin[idx])}${unit}`
        })

        hourlyTemp.forEach((temp, idx) => {
            temp.textContent = ((index + idx) >= arrLength) ? '' :  `${forecast.hourlyTempFahrenheit[index + idx]}`
        })

    }

}


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

    let forecastCopy = {}
    let lastSearched = {}

    console.log('datastore start')
    return{
        accessForecast: () => {return forecastCopy},
        accessTemp: () => {return temperatures},
        accessRecords: () => {return records},
        accessLastSearched: () => {return lastSearched},

        appendLocalStorage: (cityName) => {

            LS_Cities = JSON.parse(localStorage.getItem('LS_cityNames'))

            if(LS_Cities == null){
                LS_Cities = []
            }

            if(LS_Cities.includes(cityName)){
                return
            }

            LS_Cities.push(cityName)
            localStorage.setItem('LS_cityNames', JSON.stringify(LS_Cities))
        },

        saveCoordinate: () => {
            const coordinate = JSON.stringify(lastSearched)
            localStorage.setItem(lastSearched.cityAndCountry, coordinate)
            localStorage.setItem('lastSearched', coordinate)
        }
    }
})()

const Load_LocalStorage = (async function (){

    if(localStorage.getItem('lastSearched') == null){
        getCoordinate('hefei')
        DOM_slider()
    }
    else{
        const coordinate = JSON.parse(localStorage.getItem('lastSearched'))
        forecast = await getWeather(coordinate.lat, coordinate.lon) 
        Object.assign(dataStore.accessForecast(), forecast)

        DOM_Main(coordinate.cityAndCountry, forecast)
        DOM_forecastDaily(forecast)
        DOM_forecastHourly()
        DOM_slider()
    }

})()

function toggleDailyHourly(){

    const hourlyContainer = document.querySelector('.hourly_container')
    hourlyContainer.style.display = (window.getComputedStyle(hourlyContainer).display == 'none') ? 'grid' : 'none'

    const dailyContainer = document.querySelector('.forecast_container')
    dailyContainer.style.display = (window.getComputedStyle(dailyContainer).display == 'grid') ? 'none' : 'grid'

    const sliderContainer = document.querySelector('.slider_main')
    sliderContainer.style.display = (window.getComputedStyle(sliderContainer).display == 'none') ? 'flex' : 'none'

    const dailyHourlyBtn = document.querySelector('.dailyHourlyBtn')
    dailyHourlyBtn.textContent = (dailyHourlyBtn.textContent == '7 Day') ? '48 Hr' : '7 Day'
}

function toggleCF(){

    const forecase = dataStore.accessForecast()
    forecase.unit = (forecase.unit == 'c') ? 'f' : 'c'
    DOM_Temperature()

    const unitBtn = document.querySelector('.celsiusFahrenheitConvertion')
    unitBtn.textContent = (forecase.unit == 'c') ? '\u2109' : '\u2103'

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
            Object.assign(dataStore.accessForecast(), forecast)
            DOM_Main(cityObj.cityAndCountry, forecast)
            DOM_forecastDaily(forecast)
            DOM_forecastHourly()

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


