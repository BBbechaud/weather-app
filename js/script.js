const input = document.querySelector('input')
const btn = document.querySelector('button')
const form = document.querySelector('form')
const city = document.querySelector('.city')
const temp = document.querySelector('.temp')
const humidity = document.querySelector('.humidity')
const feelsLike = document.querySelector('.feels-like')
const wind = document.querySelector('.wind')
const condition = document.querySelector('.condition')

async function getWeather(location) {
   try{
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=47f78b96ec8146cf91a151625230611&q=${location}&days=1&aqi=no&alerts=no`)
    const weatherData = await response.json()
    console.log(weatherData)
    const newData = processData(weatherData)
    displayData(newData)
    reset()
   }
   catch(error) {
        console.log("Please enter a correct city name") 
    }
}

// gather the needed data to be later displayed
function processData(weatherData) {
    const desiredData = {       
        temp: Math.round(weatherData.current.temp_f),   
        city: weatherData.location.name.toUpperCase(),
        feelsLike: Math.round(weatherData.current.feelslike_f),
        humidity: weatherData.current.humidity,
        wind: Math.round(weatherData.current.wind_mph),
        condition: weatherData.current.condition.text,
    }
        // Use state if in US, use country if not in US
        if (weatherData.location.country === 'United States of America') {
            desiredData['region'] = weatherData.location.region.toUpperCase();
        } else {
          desiredData['region'] = weatherData.location.country.toUpperCase();
        }
    
    return desiredData
}

function displayData(newData) {
    
    temp.innerHTML = newData.temp
    city.innerHTML = `${newData.city}, ${newData.region}`
    feelsLike.innerHTML = `FEELS LIKE: ${newData.feelsLike}`
    humidity.innerHTML = `HUMIDITY: ${newData.humidity}`
    wind.innerHTML =   `WIND: ${newData.wind} MPH`
    condition.innerHTML = newData.condition
}




// Event listeners
btn.addEventListener('click', submited)
input.addEventListener('submit', submited)
function submited (event){
    event.preventDefault()
    getWeather(input.value)   
}

function reset() {
    form.reset()
}

// temp.innerHTML = Math.round(weatherData.current.temp_f)
// city.innerHTML = `${weatherData.location.name}, ${weatherData.location.country}`
// feelsLike.innerHTML = `Feels Like: ${weatherData.current.feelslike_f}`.toUpperCase()
// humidity.innerHTML = `Humidity: ${weatherData.current.humidity}`.toUpperCase()
// wind.innerHTML =   `Wind: ${weatherData.current.wind_mph} mph`.toUpperCase()
// condition.innerHTML = weatherData.current.condition.text