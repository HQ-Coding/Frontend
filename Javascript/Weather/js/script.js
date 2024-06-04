const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const WeatherDetails = document.querySelector('.weather-details');
const erroe404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

search.addEventListener('click',()=>{

    const APIKey ='aa99ff2d5c3fe5734588e3c3cea81332';
    const city = document.querySelector('.search-box input').value;

    if(city == ''){
        return;
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json =>{

        if (json.cod == '404'){
            cityHide.textContent = city;
            container.style.height = '400px';
            container.classList.remove('active');
            weatherBox.classList.remove('active');
            WeatherDetails.classList.remove('active');
            erroe404.classList.add('active');
            return;
        }

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const wind = document.querySelector('.weather-details .wind span');
        const humidity = document.querySelector('.weather-details .humidity span');

        if(cityHide.textContent == city){
            return;
        }
        else{
            cityHide.textContent = city;

            container.style.height = '555px';
            container.classList.add('active');
            weatherBox.classList.add('active');
            WeatherDetails.classList.add('active');
            erroe404.classList.remove('active');

            setTimeout(()=>{
                container.classList.remove('active');
            },2500)

            switch(json.weather[0].main){
                case 'Clear':
                    image.src = '../images/clear.png';
                    break;
    
                case 'Rain':
                    image.src = '../images/rain.png';
                    break;
    
                case 'Snow':
                    image.src = '../images/snow.png';
                    break;
    
                case 'Clouds':
                    image.src = '../images/cloud.png';
                    break;
    
                case 'Mist':
                    image.src = '../images/mist.png';
                    break;
    
                case 'Haiz':
                    image.src = '../images/mist.png';
                    break;
    
                default:
                    image.src = '../images/cloud.png';
            }
    
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            // =================================================

            const infoWeather = document.querySelector('.info-weather');
            const infoHumidity = document.querySelector('.info-humidity');
            const infoWind = document.querySelector('.info-Wind');

            const elCloneInfoWeather = infoWeather.cloneNode(true);
            const elCloneInfoHumidity = infoHumidity.cloneNode(true);
            const elCloneInfoWind = infoWind.cloneNode(true);


            elCloneInfoWeather.id = 'clone-info-weather';
            elCloneInfoWeather.classList.add('active-clone');

            elCloneInfoHumidity.id = 'clone-info-humidity';
            elCloneInfoHumidity.classList.add('active-clone');

            elCloneInfoWind.id = 'clone-info-wind';
            elCloneInfoWind.classList.add('active-clone');

            setTimeout(()=>{
                infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather);
                infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
                infoWind.insertAdjacentElement("afterend", elCloneInfoWind);
            },2200);

            const cloneInfoWeather = document.querySelectorAll('.info-weather.active-clone');
            const totalCloneInfoWeather = cloneInfoWeather.length;
            const cloneInfoWeatherFirst = cloneInfoWeather[0];


            const cloneInfoHumidity = document.querySelectorAll('.info-humidity.active-clone');
            const cloneInfoHumidityFirst = cloneInfoHumidity[0];

            const cloneInfoWind = document.querySelectorAll('.info-humidity.active-clone');
            const cloneInfoWindFirst = cloneInfoWind[0];

            if (totalCloneInfoWeather > 0){
                cloneInfoHumidityFirst.classList.remove('active-clone')
                cloneInfoWeatherFirst.classList.remove('active-clone')
                cloneInfoWindFirst.classList.remove('active-clone')

                setTimeout(( )=> {
                    cloneInfoWindFirst.remove();
                    cloneInfoWeatherFirst.remove();
                    cloneInfoHumidityFirst.remove();
                }, 2200)
            }
        }

    });

});