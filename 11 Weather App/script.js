async function getCoordinate(){

    const input = document.querySelector('input#coordinate').value

    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=af974fea2bef8843a98dfed25ae51ac3`)
    const response_json = await response.json()

    console.log(response_json)
    console.log(response.status)

    if(response_json.length == 0){

        alert(`No result for: ${input}`)
        return
    }
   
    const stateAndCountry = response_json.map((city, index) => {return '   ' + index + ' => ' + city.state + ',' + city.country})
    
    const countrySelection = prompt(`select a index: ${stateAndCountry}`)

    if (parseInt(countrySelection) > response_json.length || parseInt(countrySelection) < 0){

        alert('invalid selection! Please search again')
        return
    }

    const cityLatitude = response_json[countrySelection].lat
    const cityLongitude = response_json[countrySelection].lon

    return cityLatitude, cityLongitude
}


