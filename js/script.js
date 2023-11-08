let input = document.querySelector('input')
let btn = document.querySelector('button')
let temp = document.querySelector('.temp')

btn.addEventListener('click', event => {
    event.preventDefault()
    getWeather(input.value) 
    
})

async function getWeather(location) {
   try{
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=47f78b96ec8146cf91a151625230611&q=${location}&days=1&aqi=no&alerts=no`)
    const weatherData = await response.json()
    console.log(weatherData)
    temp.innerHTML = Math.round(weatherData.current.temp_f)
   }
   catch(error) {
        console.log("Please enter a correct city name") 
    }
}
