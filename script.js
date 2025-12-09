// Weather Icons SVG Templates
const weatherIcons = {
  sun: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>`,
  cloud: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
  </svg>`,
  rain: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <line x1="16" y1="13" x2="16" y2="21"></line>
    <line x1="8" y1="13" x2="8" y2="21"></line>
    <line x1="12" y1="15" x2="12" y2="23"></line>
    <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>
  </svg>`,
  snow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"></path>
    <line x1="8" y1="16" x2="8.01" y2="16"></line>
    <line x1="8" y1="20" x2="8.01" y2="20"></line>
    <line x1="12" y1="18" x2="12.01" y2="18"></line>
    <line x1="12" y1="22" x2="12.01" y2="22"></line>
    <line x1="16" y1="16" x2="16.01" y2="16"></line>
    <line x1="16" y1="20" x2="16.01" y2="20"></line>
  </svg>`,
  partlyCloudy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M12 2v2"></path>
    <path d="m4.93 4.93 1.41 1.41"></path>
    <path d="M20 12h2"></path>
    <path d="m19.07 4.93-1.41 1.41"></path>
    <path d="M15.947 12.65a4 4 0 0 0-5.925-4.128"></path>
    <path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"></path>
  </svg>`,
}

// DOM Elements
const cityInput = document.getElementById("cityInput")
const searchBtn = document.getElementById("searchBtn")
const errorMessage = document.getElementById("errorMessage")
const weatherDisplay = document.getElementById("weatherDisplay")
const loadingSpinner = document.getElementById("loadingSpinner")
const cityName = document.getElementById("cityName")
const country = document.getElementById("country")
const tempValue = document.getElementById("tempValue")
const weatherCondition = document.getElementById("weatherCondition")
const weatherIcon = document.getElementById("weatherIcon")
const humidity = document.getElementById("humidity")
const windSpeed = document.getElementById("windSpeed")
const localTime = document.getElementById("localTime")
const localDate = document.getElementById("localDate")

// Weather code mappings for Open-Meteo API
const weatherCodeMap = {
  0: { condition: "Clear sky", icon: "sun", bg: "clear" },
  1: { condition: "Mainly clear", icon: "sun", bg: "clear" },
  2: { condition: "Partly cloudy", icon: "partlyCloudy", bg: "clear" },
  3: { condition: "Overcast", icon: "cloud", bg: "cloudy" },
  45: { condition: "Foggy", icon: "cloud", bg: "cloudy" },
  48: { condition: "Depositing rime fog", icon: "cloud", bg: "cloudy" },
  51: { condition: "Light drizzle", icon: "rain", bg: "rainy" },
  53: { condition: "Moderate drizzle", icon: "rain", bg: "rainy" },
  55: { condition: "Dense drizzle", icon: "rain", bg: "rainy" },
  61: { condition: "Slight rain", icon: "rain", bg: "rainy" },
  63: { condition: "Moderate rain", icon: "rain", bg: "rainy" },
  65: { condition: "Heavy rain", icon: "rain", bg: "rainy" },
  71: { condition: "Slight snow", icon: "snow", bg: "snowy" },
  73: { condition: "Moderate snow", icon: "snow", bg: "snowy" },
  75: { condition: "Heavy snow", icon: "snow", bg: "snowy" },
  80: { condition: "Slight rain showers", icon: "rain", bg: "rainy" },
  81: { condition: "Moderate rain showers", icon: "rain", bg: "rainy" },
  82: { condition: "Violent rain showers", icon: "rain", bg: "rainy" },
  95: { condition: "Thunderstorm", icon: "rain", bg: "rainy" },
  96: { condition: "Thunderstorm with hail", icon: "rain", bg: "rainy" },
  99: { condition: "Thunderstorm with heavy hail", icon: "rain", bg: "rainy" },
}

// Show/hide functions
function showError(message) {
  errorMessage.textContent = message
  errorMessage.classList.add("show")
  weatherDisplay.classList.add("hidden")
}

function hideError() {
  errorMessage.classList.remove("show")
}

function showLoading() {
  loadingSpinner.classList.remove("hidden")
  weatherDisplay.classList.add("hidden")
  hideError()
}

function hideLoading() {
  loadingSpinner.classList.add("hidden")
}

function formatLocalTime(timezone) {
  const now = new Date()
  const options = {
    timeZone: timezone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }
  const dateOptions = {
    timeZone: timezone,
    weekday: "long",
    day: "numeric",
    month: "short",
  }

  const timeString = now.toLocaleTimeString("en-US", options)
  const dateString = now.toLocaleDateString("en-US", dateOptions)

  return { timeString, dateString }
}

function isNightTime(timezone) {
  const now = new Date()
  const options = { timeZone: timezone, hour: "numeric", hour12: false }
  const hour = Number.parseInt(now.toLocaleTimeString("en-US", options))
  return hour >= 18 || hour < 6
}

function updateBackground(bgClass, isNight, isClearSky) {
  document.body.className = ""

  if (isClearSky && isNight) {
    document.body.classList.add("night")
  } else {
    if (bgClass) {
      document.body.classList.add(bgClass)
    }
    document.body.classList.add("day-clouds")
  }
}

function updateWeatherIcon(iconType) {
  weatherIcon.innerHTML = weatherIcons[iconType] || weatherIcons.sun
  weatherIcon.className = "weather-icon"

  if (iconType === "cloud" || iconType === "partlyCloudy") {
    weatherIcon.classList.add("cloudy")
  } else if (iconType === "rain") {
    weatherIcon.classList.add("rainy")
  } else if (iconType === "snow") {
    weatherIcon.classList.add("snowy")
  }
}

// Main fetch function
async function fetchData(city) {
  showLoading()

  try {
    // Step 1: Get coordinates from city name using Open-Meteo Geocoding API
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`,
    )

    if (!geoResponse.ok) {
      throw new Error("Failed to fetch location data")
    }

    const geoData = await geoResponse.json()

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error("City not found. Please check the spelling and try again.")
    }

    const location = geoData.results[0]
    const { latitude, longitude, name, country: countryName, timezone } = location

    // Step 2: Get weather data using coordinates
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`,
    )

    if (!weatherResponse.ok) {
      throw new Error("Failed to fetch weather data")
    }

    const weatherData = await weatherResponse.json()
    const current = weatherData.current
    const locationTimezone = weatherData.timezone || timezone

    // Get weather info from code
    const weatherInfo = weatherCodeMap[current.weather_code] || {
      condition: "Unknown",
      icon: "sun",
      bg: "clear",
    }

    const { timeString, dateString } = formatLocalTime(locationTimezone)
    const isNight = isNightTime(locationTimezone)
    const isClearSky = current.weather_code <= 1

    // Update UI
    cityName.textContent = name
    country.textContent = countryName
    tempValue.textContent = Math.round(current.temperature_2m)
    weatherCondition.textContent = weatherInfo.condition
    humidity.textContent = `${current.relative_humidity_2m}%`
    windSpeed.textContent = `${Math.round(current.wind_speed_10m)} km/h`
    localTime.textContent = timeString
    localDate.textContent = dateString

    updateWeatherIcon(weatherInfo.icon)
    updateBackground(weatherInfo.bg, isNight, isClearSky)

    hideLoading()
    weatherDisplay.classList.remove("hidden")
  } catch (error) {
    hideLoading()
    showError(error.message || "Something went wrong. Please try again.")
  }
}

// Event Listeners
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim()
  if (city) {
    fetchData(city)
  } else {
    showError("Please enter a city name")
  }
})

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = cityInput.value.trim()
    if (city) {
      fetchData(city)
    } else {
      showError("Please enter a city name")
    }
  }
})
