function renderCurrenyWeather(weatherCode, cityName, weatherDesc, tempValue, feelsTempValue, rainChance, humidityPerc, windSpeed) {
    const cityNameNode = document.querySelector('.current-result__city-name');
    cityNameNode.textContent = cityName;

    const weatherImg = document.querySelector('.weather-img');
    if (weatherCode >= 200 && weatherCode < 300) {
        weatherImg.src = './img/thunderstorm.svg'
    } else if (weatherCode >= 300 && weatherCode < 600) {
        weatherImg.src = './img/rain.svg'
    } else if (weatherCode >= 600 && weatherCode < 700) {
        weatherImg.src = './img/snow.svg'
    } else if (weatherCode >= 700 && weatherCode < 800) {
        weatherImg.src = './img/mist.svg'
    } else if (weatherCode === 800) {
        weatherImg.src = './img/sun.svg'
    } else { weatherImg.src = './img/clouds.svg' }
    const weatherDescNode = document.querySelector('.current-result__weather-description');
    weatherDescNode.textContent = weatherDesc;

    const tempNode = document.querySelector('.temp-value');
    tempNode.textContent = tempValue;

    const feelsTempNode = document.querySelector('.feels-like-value');
    feelsTempNode.textContent = feelsTempValue;

    const rainNode = document.querySelector('.rain-chance-value');
    rainNode.textContent = rainChance;

    const humidityNode = document.querySelector('.humidity-value');
    humidityNode.textContent = humidityPerc;

    const windSpeedNode = document.querySelector('.wind-speed-value');
    windSpeedNode.textContent = windSpeed;
}

export { renderCurrenyWeather }