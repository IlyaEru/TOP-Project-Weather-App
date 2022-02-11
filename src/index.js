import { renderCurrenyWeather } from "./dom-manip";
import { apiData, changeWeather } from "./api-func";
const searchButton = document.querySelector('button');
const cityInput = document.querySelector('.city-name');
searchButton.addEventListener('click', () => {
	changeWeather()
	// apiData.setApiData()
	// const cityName = apiData.getCityName();
	// const weatherCode = apiData.getWeatherCode();
	// const weatherDesc = apiData.getWeatherDescription();
	// const tempValue = apiData.getCurrentTemp();
	// const windSpeed = apiData.getWindSpeed();
	// const feelsTempValue = apiData.getCurrentFeelsTemp();
	// const rainChance = apiData.getChanceOfRain();
	// const humidityPerc = apiData.getHumidity();
	// renderCurrenyWeather(weatherCode,
	// 	cityName,
	// 	weatherDesc,
	// 	tempValue,
	// 	feelsTempValue,
	// 	rainChance,
	// 	humidityPerc,
	// 	windSpeed)
});
cityInput.addEventListener('keyup', (e) => {
	if (e.keyCode === 13) {
		changeWeather();
	}
})
function init() {
	changeWeather('Tel aviv');
}
init()
