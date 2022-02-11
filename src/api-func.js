/* eslint-disable no-unreachable */
import { renderCurrenyWeather } from "./dom-manip";
async function changeWeather(initCity = '') {
    const inputCityName = initCity || document.querySelector('.city-name').value;
    const weatherApiData = await getApiData(inputCityName);


    function getCityName() {
        return weatherApiData.city.name + ', ' + weatherApiData.city.country;
    }
    function getWeatherCode() {
        return weatherApiData.list[0].weather[0].id;
    }
    function getWeatherDescription() {
        return weatherApiData.list[0].weather[0].description;
    }
    function getCurrentTemp() {
        const tempNowKelvin = weatherApiData.list[0].main.temp;
        const tempNowCelsius = Math.round((Number(tempNowKelvin) - 273.15) * 10) / 10;
        return tempNowCelsius;
    }
    function getCurrentFeelsTemp() {
        const tempFeelsNowKelvin = weatherApiData.list[0].main.feels_like;
        const tempFeelsNowCelsius = Math.round((Number(tempFeelsNowKelvin) - 273.15) * 10) / 10;
        return tempFeelsNowCelsius;
    }
    function getChanceOfRain() {
        return weatherApiData.list[0].pop * 100;
    }
    function getHumidity() {
        return weatherApiData.list[0].main.humidity;
    }
    function getWindSpeed() {
        const windSpeedNowMeterPerSecond = weatherApiData.list[0].wind.speed;
        const windSpeedNowKPH = Math.round((Number(windSpeedNowMeterPerSecond) * 3.6) * 10) / 10;
        return windSpeedNowKPH;
    }

    const cityName = getCityName();
    const weatherCode = getWeatherCode();
    const weatherDesc = getWeatherDescription();
    const tempValue = getCurrentTemp();
    const windSpeed = getWindSpeed();
    const feelsTempValue = getCurrentFeelsTemp();
    const rainChance = getChanceOfRain();
    const humidityPerc = getHumidity();

    renderCurrenyWeather(weatherCode,
        cityName,
        weatherDesc,
        tempValue,
        feelsTempValue,
        rainChance,
        humidityPerc,
        windSpeed,
    )
    console.log(weatherApiData);
    const sortedData = weatherApiData.list.reduce((total, next) => {
        total[next.dt_txt.split(' ')[0]] = total[next.dt_txt.split(' ')[0]] || [];
        total[next.dt_txt.split(' ')[0]].push(next);
        return total;
    }, {})
    console.log(sortedData);

}

const apiData = (function apiData() {
    const cityName = document.querySelector('.city-name').value;
    let weatherApiData;

    function setApiData() {
        const ApiData = getApiData(cityName);
        ApiData.then((apiData) => {
            weatherApiData = apiData
        }).catch((error) => {
            console.log(error);
        })
    }



    function getCityName() {

        return weatherApiData.city.name + ', ' + weatherApiData.city.country;
    }
    function getWeatherCode() {
        return weatherApiData.list[0].weather[0].id;
    }
    function getWeatherDescription() {
        return weatherApiData.list[0].weather[0].description;
    }
    function getCurrentTemp() {
        const tempNowKelvin = weatherApiData.list[0].main.temp;
        const tempNowCelsius = Math.round((Number(tempNowKelvin) - 273.15) * 10) / 10;
        return tempNowCelsius;
    }
    function getCurrentFeelsTemp() {
        const tempFeelsNowKelvin = weatherApiData.list[0].main.feels_like;
        const tempFeelsNowCelsius = Math.round((Number(tempFeelsNowKelvin) - 273.15) * 10) / 10;
        return tempFeelsNowCelsius;
    }
    function getChanceOfRain() {
        return weatherApiData.list[0].pop * 100;
    }
    function getHumidity() {
        return weatherApiData.list[0].main.humidity;
    }
    function getWindSpeed() {
        const windSpeedNowMeterPerSecond = weatherApiData.list[0].wind.speed;
        const windSpeedNowKPH = Math.round((Number(windSpeedNowMeterPerSecond) * 3.6) * 10) / 10;
        return windSpeedNowKPH;
    }
    return {
        setApiData,
        getCityName,
        getWeatherCode,
        getWeatherDescription,
        getCurrentTemp,
        getCurrentFeelsTemp,
        getChanceOfRain,
        getHumidity,
        getWindSpeed,
    }
}())

async function getApiData(cityName) {
    try {
        const url = 'api.openweathermap.org';
        const response = await fetch(`https://${url}/data/2.5/forecast?q=${cityName}&APPID=9dbacf94042384bcf9011370349c98d3`);
        const weatherData = await response.json();
        return weatherData;
        const tempNowKelvin = weatherData.list[0].main.temp;
        const tempNowCelsius = Math.round((Number(tempNowKelvin) - 273.15) * 10) / 10;

        const tempFellsNowKelvin = weatherData.list[0].main.feels_like;
        const tempFellsNowCelsius = Math.round((Number(tempFellsNowKelvin) - 273.15) * 10) / 10;

        const weatherDescriptionNow = weatherData.list[0].weather[0].description;

        const cityNameAndCountry = weatherData.city.name + ', ' + weatherData.city.country;

        const humidityNow = weatherData.list[0].main.humidity;

        const windSpeedNowMeterPerSecond = weatherData.list[0].wind.speed;
        const windSpeedNowKPH = Math.round((Number(windSpeedNowMeterPerSecond) * 3.6) * 10) / 10;
        console.log({ windSpeedNowKPH, humidityNow, cityNameAndCountry, tempNowCelsius, tempFellsNowCelsius, weatherDescriptionNow })

        console.log(weatherData.list[0].dt_txt.split(' ')[0]);
        const sortedData = weatherData.list.reduce((total, next) => {
            total[next.dt_txt.split(' ')[0]] = total[next.dt_txt.split(' ')[0]] || [];
            total[next.dt_txt.split(' ')[0]].push(next);
            return total;
        }, {})
        console.log(sortedData);
        for (const day in sortedData) {
            sortedData[day].sort((a, b) => (a.main.temp - b.main.temp))
        }


        console.log(sortedData);

    } catch (error) {
        console.log(error);
    }
}
export { apiData, changeWeather };