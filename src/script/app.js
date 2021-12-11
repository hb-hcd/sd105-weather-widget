// https://api.openweathermap.org/data/2.5/onecall?lat=49.803159&lon=-97.157667&exclude=daily&appid=7b8e6d74ff3768e9ec431b99631d6835

// current weather
// https://api.openweathermap.org/data/2.5/weather?q=winnipeg&units=metric&appid=7b8e6d74ff3768e9ec431b99631d6835

//5 day forecast
// https://api.openweathermap.org/data/2.5/forecast?q=winnipeg&cnt=5&appid=7b8e6d74ff3768e9ec431b99631d6835

//weather status image
//https://openweathermap.org/img/wn/02d@2x.png

let lon, lat;
const token = 'pk.eyJ1IjoiaHhiMTEiLCJhIjoiY2t3ejVxM3h4MGtvaDJwb2JpZHAzeTFhbCJ9.XbOXHJ5oaNHOY1IFJhJefQ'
const geoCode = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
const queryCondition = '.json?bbox=-97.32972%2C49.762789%2C-96.951241%2C49.994007&limit=9&proximity=-97.1596764%2C49.8132188&types=poi&access_token='

const apikey = '7b8e6d74ff3768e9ec431b99631d6835';
const imgUrl = 'https://openweathermap.org/img/wn/';
const baseUrl = 'https://api.openweathermap.org/data/2.5/';
const curr_img = document.querySelector('.current-conditions > img');
const curr_temp = document.querySelector('.temp')
const curr_condition = document.querySelector('.condition')
const forcastDiv = document.querySelector('.forecast');
const daysRange = [
    [0, 7],
    [8, 15],
    [16, 23],
    [24, 31],
    [32, 39]
]

// function getUserLocation() {
//     if (!navigator.geolocation) {
//         console.log('Geolocation is not supported by your browser');
//     } else {
//          navigator.geolocation.getCurrentPosition((position) => {
//             // lat = position.coords.latitude;
//             // lon = position.coords.longitude;
//             return position.coords;
//         })
//     }
// }

const currentWeather = () => {
    if (!navigator.geolocation) {
        console.log('Geolocation is not supported by your browser');
    } else {
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude
            fetch(`${baseUrl}weather?lat=${lat}&lon=${lon}&units=metric&appid=${apikey}`)
                .then(res => res.json())
                .then(data => {
                    curr_temp.innerHTML = `${data.main.temp}<span>&#8451;</span>`;
                    curr_condition.innerText = `${data.weather[0].description}`
                    curr_img.src = `${imgUrl}${data.weather[0].icon}@2x.png`;
                });
        })
    }
}

const randomTimeofFiveDays = () => {
    const days = [];
    for (let i = 0; i < 5; i++) {
        days.push(Math.ceil(Math.random()*(daysRange[i][1]-daysRange[i][0])+daysRange[i][0]));
    }
    return days;
}


const fiveDayForecast = () => {
    if (!navigator.geolocation) {
        console.log('Geolocation is not supported by your browser');
    } else {
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude
            fetch(`${baseUrl}forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apikey}`)
                .then(res => res.json())
                .then(data => {
                    const days = randomTimeofFiveDays();
                        for (const day of days) {
                            console.log(data.list[day]);
                        }
                    });
                });
        }
    }


currentWeather();
fiveDayForecast();


