Project Structure

├── index.html       // Main structure of the application

├── style.css        // All visual styling, including dynamic background animations

└── script.js        // Core JavaScript logic, API fetching, and UI updates

└── package.json     // (Optional, project metadata)

# - 🌤 Dynamic Weather-Web-Application
This is Weather Web Application developed using HTML, CSS, and Vanilla JavaScript. The application fetches and displays real-time weather information such as temperature, humidity, wind speed, and the city’s local time. It features a clean, responsive, card-based UI with dynamic backgrounds that adapt based on current weather conditions and time.

This is a modern, responsive web application designed to fetch and display real-time weather information, local time, and dynamic backgrounds based on conditions and time of day.

### ✨ Features

  * **Real-time Weather:** Fetches current temperature, humidity, wind speed, and weather condition.
  * **Accurate Local Time:** Calculates and displays the accurate local time and date for the searched city using timezone data from the API.
  * **Dynamic Backgrounds:** The background visually changes based on the weather (e.g., clear, cloudy, rainy, snowy) and time of day (a starry night theme for clear nights).
  * **SVG Icons:** Uses custom, high-quality SVG icons for weather conditions.
  * **Responsive Design:** Styled with CSS3 (Flexbox/Grid) to look great on all device sizes.
  * **Loading & Error Handling:** Provides clear loading spinners and user-friendly error messages if a city is not found or the network fails.

### 🛠 Tech Stack

  * **HTML5:** Structure
  * **CSS3:** Styling and dynamic backgrounds (`style.css`)
  * **Vanilla JavaScript (ES6+):** Logic, DOM manipulation, and API interaction (`script.js`)

### 🌐 API Used

This project relies on the **Open-Meteo** service, which provides free, non-commercial API access without requiring an API key.

1.  **Open-Meteo Geocoding API:** Used to convert the user-entered city name into geographical coordinates (Latitude and Longitude).
2.  **Open-Meteo Weather Forecast API:** Used to retrieve current weather data and the corresponding timezone for the given coordinates.

### 🚀 Getting Started

Follow these steps to get your weather application running locally.

#### 1\. Clone the Repository (or Save Files)

Ensure you have the three core files in the same directory:

  * `index.html`
  * `style.css`
  * `script.js`

#### 2\. Run with Live Server

The easiest way to run this project is using the **Live Server** extension in VS Code:

1.  Open the project directory in **VS Code**.
2.  Make sure the **Live Server** extension (by Ritwick Dey) is installed.
3.  Right-click on `index.html` and select **"Open with Live Server"** (or click the "Go Live" button in the status bar).

The application will open in your default web browser.

#### 3\. Usage

1.  Enter the name of a city (e.g., "London", "Tokyo", "New York") into the input box.
2.  Click **"Get Weather"** or press **Enter**.
3.  The application will display the current conditions and dynamically update the background\!

### ⚙️ Project Structure

```
.
├── index.html       // Main structure of the application
├── style.css        // All visual styling, including dynamic background animations
└── script.js        // Core JavaScript logic, API fetching, and UI updates
└── package.json     // (Optional, project metadata)
```
