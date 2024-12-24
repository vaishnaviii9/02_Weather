document.addEventListener('DOMContentLoaded', () => {
    let cityInput = document.getElementById('city-input')
    let getWeatherBtn = document.getElementById('get-weather-btn')
    let weatherInfo = document.getElementById('weather-info')
    let cityName = document.getElementById('city-name')
    let temperatureDisplay = document.getElementById('temperature')
    let descriptionDisplay = document.getElementById('description')
    let weatherIcon = document.getElementById('weather-icon')
    let errorMessage = document.getElementById('error-message')
    const API_KEY = '5b4635618ff4d0ef244a1100f68c6240'

    getWeatherBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim()
        //   console.log(city);
        if (!city) return

        try {
            const weatherData = await fetchWeatherData(city)
            displayWeatherData(weatherData)

        } catch (error) {
            showError()
        }


    })

    async function fetchWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

            const response = await fetch(url)
            // console.log(response);
            // console.log(typeof response);
            
            if(!response.ok){
                throw new Error("City not found")
            }

            const data = response.json()
            // console.log(data);
            
            return data

    }

    function displayWeatherData(data) {
        // console.log(data);
        const {name,weather,main} =data

        cityName.textContent = name
        temperatureDisplay.textContent = `Temperature : ${main.temp}` 
        descriptionDisplay.textContent =  `Weather : ${weather[0].description}`

        const iconCode = weather[0].icon
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`

        weatherIcon.src = iconUrl
        weatherIcon.alt = weather[0].description

        weatherInfo.classList.remove('hidden')
        errorMessage.classList.add('hidden')
    }

    function showError() {
        weatherInfo.classList.add('hidden')
        errorMessage.classList.remove('hidden')
    }
})