document.addEventListener('DOMContentLoaded',()=>{
    let cityInput= document.getElementById('city-input')
    let getWeatherButton = document.getElementById('get-weather-btn')
    let weatherInfo = document.getElementById('weather-info')
    let cityNameDisplay = document.getElementById('city-name')
    let temperatureDisplay = document.getElementById('temperature')
    let descriptionDisplay = document.getElementById('description')
    let errorMessage = document.getElementById('error-message')
    let iconDisplay = document.getElementById('weather-icon')
    const API_KEY ='5b4635618ff4d0ef244a1100f68c6240'
    

    // https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&appid={API key}

    getWeatherButton.addEventListener('click', async ()=>{
        const city = cityInput.value.trim();
        if (!city) return;

        // it may throw an error
        // server/database is always in another continent

        try {     
           const weatherData= await fetchWeatherData(city)
            displayWeatherData(weatherData)
        } catch (error) {
            showError()
        }
    })
    // fetch weather data

  async function fetchWeatherData(city){
        // fetch
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        const response = await fetch(url)
        console.log(typeof response);
        console.log("RESPONSE", response);
        if(!response.ok){
            throw new Error('City not found')
        }
        const data = await response.json()
        return data
    }

    // display weather data
    function displayWeatherData(data){
        // display
         console.log(data)
         const {name,main, weather}  = data
         cityNameDisplay.textContent= name
        temperatureDisplay.textContent=`Temperature: ${main.temp}`
        descriptionDisplay.textContent=`Weather: ${weather[0].description}`

        // create and display the weather icon
        const iconCode = weather[0].icon
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`
        iconDisplay.src = iconUrl
        iconDisplay.alt = weather[0].description

        //  remove "hidden"
        weatherInfo.classList.remove('hidden')
        errorMessage.classList.add('hidden')
    }

    function showError(){
        weatherInfo.classList.add('hidden')
        errorMessage.classList.remove('hidden')
    }
})