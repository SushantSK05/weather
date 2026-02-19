async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherInfo = document.getElementById("weatherInfo");

  if (!city) {
    weatherInfo.innerHTML = "<p>Please enter a city name</p>";
    return;
  }

  const API_KEY = "8f17760a3864cbbc728c8e3d51fd226b";
  const API_URL = `https://corsproxy.io/?http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}&units=m`;

  try {
    weatherInfo.innerHTML = "<p>Loading...</p>";

    const response = await fetch(API_URL);
    const data = await response.json();

    if (data.error) {
      weatherInfo.innerHTML = `<p>${data.error.info}</p>`;
      return;
    }

    weatherInfo.innerHTML = `
      <h2>${data.location.name}, ${data.location.country}</h2>
      <p>🌡️ Temperature: ${data.current.temperature} °C</p>
      <p>🌥️ Weather: ${data.current.weather_descriptions[0]}</p>
      <p>💧 Humidity: ${data.current.humidity}%</p>
      <p>🌬️ Wind Speed: ${data.current.wind_speed} km/h</p>
    `;
  } catch (error) {
    weatherInfo.innerHTML = "<p>Error fetching weather data</p>";
    console.error("Fetch error:", error);
  }
}
