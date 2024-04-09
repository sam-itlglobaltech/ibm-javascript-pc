// prevents the default behavior of an event, such as form submission,
// within a function named showweatherDetails
function showweatherDetails(event) {
    event.preventDefault();

    // Use fetch api method to fetch details related to city
    // which user will enter in the input box provided in the HTMl file.
    // Include below code inside the showweatherDetails function below
    // variables initialization
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `<h2>Weather in ${data.name}</h2>
                            <p>Temperature: ${data.main.temp} &#8451;</p>
                            <p>Weather: ${data.weather[0].description}</p>`;
})

    .catch(error => {
        console.error('Error fetching weather:', error);
        const weatherInfo = document.getElementById('weatherInfo');
        weatherInfo.innerHTML = `<p>Failed to fetch weather. Please try again.</p>`;
    });

}

document.getElementById('weatherForm').addEventListener('submit',showweatherDetails );

// Within showweatherDetails function, initialize three variables
// for city, apiKey and apiUrl as follows:
const city = document.getElementById('city').value;
const apiKey = '5593aa84a72f3eedf2cbee4c8075ab89'; // Replace 'YOUR_API_KEY' with your actual API key
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

