var temp = document.getElementById('temp');
var cityName = document.getElementById('city');
var humidity = document.getElementById('humidity');
var windspeed = document.getElementById('windspeed');
var searchinput = document.getElementById('searchinput');
var searchbox = document.getElementById('searchbox');
var body_img = document.getElementById('body_img');
var body_data = document.getElementById('body_data');
var detail = document.getElementById('detail');
var error = document.getElementById('error');

async function checkWeather(city) {
    let apiKey = '6d3495afa8ee2a6dc3f40c2ff66ded67'; 
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        let data = await response.json();
        
        if (data.cod === 200) { 
            temp.innerHTML = Math.floor(data.main.temp) + '°C';
            cityName.innerHTML = data.name;
            humidity.innerHTML = data.main.humidity + "%";
            windspeed.innerHTML = (data.wind.speed * 3.6).toFixed(2) + ' km/h'; 
            // Converting m/s to km/h
            
            switch (data.weather[0].main) {
                case "Clouds":
                    body_img.src = 'images/clouds.png';
                    break;
                case "Clear":
                    body_img.src = 'images/clear.png';
                    break;
                case "Drizzle":
                    body_img.src = 'images/drizzle.png';
                    break;
                case "Mist":
                    body_img.src = 'images/mist.png';
                    break;
                case "Rain":
                    body_img.src = 'images/rain.png';
                    break;
                case "Snow":
                    body_img.src = 'images/snow.png';
                    break;
                case "Wind":
                    body_img.src = 'images/wind.png';
                    break;    
                default:
                    body_img.src = 'images/default.png';
                    break;
            }
            
            body_data.style.display = 'flex';
            detail.style.display = 'flex';
            error.style.display = 'none'; 
        } else {
            throw new Error(data.message); 
        }
    } catch (err) {
        console.error('Error fetching weather data:', err);
        error.innerHTML = 'City not found or an error occurred!';
        error.style.display = 'block';
        body_data.style.display = 'none';
        detail.style.display = 'none';
    }
}

searchbox.addEventListener('click', () => {
    let cityIn = searchinput.value;
    if (cityIn) {
        checkWeather(cityIn);
    }
});
