window.addEventListener('load', () => {
    const temperatureDescription = document.querySelector('.temperature-description')
    const temperatureDegree = document.querySelector('.temperature-degree')
    const locationName = document.querySelector('.location-name')
    const icon = document.querySelector('.weather-icon')

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const long = position.coords.longitude
            const lat = position.coords.latitude
            const key = 'f0748de841704bdb4fb4ebabb3e769ae'
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=metric`
            fetch(api)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    temperatureDegree.textContent = data.main.temp
                    temperatureDescription.textContent = data.weather[0].description
                    locationName.textContent = data.name
                    icon.innerHTML = `<img src=./icons/${data.weather[0].icon}.png>`;
                })
        })
    } 
    else {
        h1.textContent = 'Hey this is not working because you dont allow'
    }
})