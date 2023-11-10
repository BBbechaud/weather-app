const input = document.querySelector('input')
const btn = document.querySelector('button')
const form = document.querySelector('form')
const errorMsg = document.querySelector('.error-msg')
const city = document.querySelector('.city')
const temp = document.querySelector('.temp')
const humidity = document.querySelector('.humidity')
const feelsLike = document.querySelector('.feels-like')
const wind = document.querySelector('.wind')
const condition = document.querySelector('.condition')
const localTime = document.querySelector('.local-time')
const c = document.querySelector('.container')
const f = new Intl.DateTimeFormat('en-us', {
    dateStyle: 'medium',
    timeStyle: 'short',
})

// API Fetch
async function getWeather(location) {
   try{
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=47f78b96ec8146cf91a151625230611&q=${location}&days=1&aqi=no&alerts=no`)
    const weatherData = await response.json()
    console.log(weatherData)
    const newData = processData(weatherData)
    displayData(newData)
    errorMsg.style.display = 'none'
    c.classList.add('info')
    reset()
   }
   catch(error) {
        errorMsg.style.display = 'block'
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
        time: new Date(weatherData.location.localtime).getHours(),   
        localTime: new Date(weatherData.location.localtime)
    }

          
        // Use state if in US, use country if not in US
        if (weatherData.location.country === 'United States of America') {
            desiredData['region'] = weatherData.location.region.toUpperCase();
        } else {
          desiredData['region'] = weatherData.location.country.toUpperCase();
        }

    return desiredData
}

// Use gathered data to display on DOM
function displayData(newData) { 
    const weatherInfo = document.getElementsByClassName('info')
    Array.from(weatherInfo).forEach((div) => {
        if (div.classList.contains('fade-in')) {
            div.classList.remove('fade-in');
            div.offsetWidth;
            div.classList.add('fade-in');
          } else {
            div.classList.add('fade-in');
          }
    })
    
    temp.innerHTML = newData.temp
    city.innerHTML = `${newData.city}, ${newData.region}`
    feelsLike.innerHTML = `FEELS LIKE: ${newData.feelsLike}`
    humidity.innerHTML = `HUMIDITY: ${newData.humidity}`
    wind.innerHTML =   `WIND SPEED: ${newData.wind} MPH`
    condition.innerHTML = newData.condition
    localTime.innerHTML = f.format(newData.localTime)
    changeBackground(newData)
}

 // Change background image based on local time
function changeBackground(newData) {
    if (newData.time >= '6' && newData.time <= '8'){
        document.body.style.backgroundImage = "url('../weather-app/images/dawn.jpg')"
    } else if (newData.time > '8' && newData.time <= '18'){
            document.body.style.backgroundImage = "url('../weather-app/images/day.jpg')"
    } else if (newData.time > '18' && newData.time <= '20'){
        document.body.style.backgroundImage = "url('../weather-app/images/dusk.jpg')"
    } else {
        document.body.style.backgroundImage = "url('../weather-app/images/night.jpg')"
    }
}

// On page load, display NY as default city
    window.onload = function() {
        
        getWeather('New York')
    }


// Event listeners and reset
btn.addEventListener('click', submited)
input.addEventListener('submit', submited)

function submited (event){
    event.preventDefault()
    getWeather(input.value)   
}
function reset() {
    form.reset()
}