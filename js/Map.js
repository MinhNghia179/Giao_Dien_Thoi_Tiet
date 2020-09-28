$(document).ready(function () {
    $(".fa-window-close").click(function () {
        $(".larger").css("display", "none");
    });
    var city = '';
    var weather = [];
    const actions = new Map([
        [200, [thunder, 'add_thunder_rain_descrease_font']],
        [201, [thunder, 'add_thunder_rain_descrease_font']],
        [202, [thunder, 'add_thunder_heavy_rain_descrease_font']],
        [210, [thunder, 'add_thunder']],
        [211, [thunder, 'add_thunder']],
        [212, [thunder, 'add_thunder_decrease_font']],
        [221, [thunder, 'add_thunder_decrease_font']],
        [230, [thunder, 'add_thunder_rain_decrease_font']],
        [231, [thunder, 'add_thunder_rain_decrease_font']],
        [232, [thunder, 'add_thunder_rain_decrease_font']],

        [300, [light_rain, 'add_rain_decrease_font']],
        [301, [light_rain, 'add_rain']],
        [302, [light_rain, 'add_rain_decrease_font']],
        [310, [light_rain, 'add_rain_decrease_font']],
        [311, [light_rain, 'add_rain']],
        [312, [light_rain, 'add_rain_decrease_font']],
        [313, [light_rain, 'add_rain_decrease_font']],
        [314, [light_rain, 'add_rain_decrease_font']],
        [321, [light_rain, 'add_rain']],

        [500, [light_rain, 'add_rain']],
        [501, [moderate_rain, 'add_rain']],
        [502, [heavy_rain, 'increase_rain_width_descrease_font']],
        [503, [heavy_rain, 'increase_rain_width']],
        [504, [heavy_rain, 'increase_rain_width']],
        [511, [heavy_rain, 'increase_rain_width']],
        [520, [heavy_rain, 'increase_rain_width_descrease_font']],
        [521, [heavy_rain, 'increase_rain_width']],
        [522, [heavy_rain, 'increase_rain_width_descrease_font']],
        [531, [heavy_rain, 'increase_rain_width_descrease_font']],

        [/^[600-622]$/, [snowy, 'add_snow']],

        [701, [windy, 'add_mist']],
        [702, [windy, 'add_mist']],
        [703, [windy, 'add_mist']],
        [704, [windy, 'add_mist']],
        [731, [foggy, 'add_fog']],
        [741, [foggy, 'add_fog']],
        [771, [hail_rain, 'increase_rain_width']],
        [781, [tornado, 'increase_rain_width']],

        [800, [sunny, '']],
        [801, [light_sun, '']],
        [802, [cloudy, '']],
        [803, [cloudy, '']],
        [804, [cloudy, '']],

        ['default', [sunny, '']]
    ]);
    function checkWeather(status) {
        let action = actions.get(status) || actions.get('default');
        func_weather(action[1]);
        icon(action[0]);
    }
    function icon(checkIcon) {
        $('.weather .icon').html(checkIcon);
    }
    function func_weather(checkweather) {
        switch (checkWeather) {
            case 'add_thunder_rain_descrease_font': {
                $('.lightning').css('display', 'block');
                $('.layer-1 .rain').css('display', 'block');
                break;
            }
            case 'add_thunder_heavy_rain_descrease_font': {
                $('.lightning').css('display', 'block');
                $('.layer-1').css('display', 'block');
                $('.rain').css('display', 'block');
                $('.rain').css('width', '2px');
                break;
            }
            case 'add_thunder': {
                $('.lightning').css('display', 'block');
                break;
            }
            case 'add_rain_decrease_font': {
                $('.layer-1 .rain').css('display', 'block');
                break;
            }
            case 'add_rain': {
                $('.layer-1 .layer-2 .rain').css('display', 'block');
                break;
            }
        }
    }
    google.maps.event.addListener(map, 'click', function (event) {
        var show_lat = event.latLng.lat();
        var show_lng = event.latLng.lng();
        $.ajax({
            type: 'GET',
            dataType: 'json',
            data: {},
            url: `http://api.openweathermap.org/data/2.5/weather?lat=${show_lat}&lon=${show_lng}&APPID=7eb30434805da50cca76833b93c4561c`,
            success: function (data) {
                weather.city = data.name;
                weather.weather = data.weather[0].description;
                weather.weather_id = data.weather[0].id;
                checkWeather(weather.weather_id);
                weather.temp = data.main.temp;
                weather.feels_like = data.main.feels_like;
                weather.maxTemp = data.main.temp_max;
                weather.minTemp = data.main.temp_min;
                $('.weather .city').html(weather.city);
                $('.weather .curr-temp span').html(weather.temp);
                $('.weather .discription').html(weather.weather);
                $('.weather .feels').html(weather.feels_like);
                $('.weather .min-weather').html(weather.minTemp);
                $('.weather .max-weather').html(weather.maxTemp);
            }
        });
        $(".larger").css("display", "block");
    });
}, false);
var map;
function initMap() {
    var options = {
        zoom: 5,
        center: { lat: 21.03375213377537, lng: 105.84872060696712 },
        panControl: true,
        scaleControl: true,
        mapTypeId: "satellite",
        zoomControl: true
    };
    map = new google.maps.Map(document.getElementById("map"), options);
};
var date = new Date();
var weekday = '';
switch (date.getDay()) {
    case 0: {
        weekday = 'Sunday';
        break;
    }
    case 1: {
        weekday = 'Monday';
        break;
    }
    case 2: {
        weekday = 'Tuesday';
        break;
    }
    case 3: {
        weekday = 'Wednesday';
        break;
    }
    case 4: {
        weekday = 'Thursday';
        break;
    }
    case 5: {
        weekday = 'Friday';
        break;
    }
    case 6: {
        weekday = 'Saturday';
        break;
    }
    default: {
        weekday = 'No Day';
        break;
    }
}
var day = weekday + String.fromCharCode(160) + String.fromCharCode(160) + String.fromCharCode(160) + "  " + date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
var time = date.getHours() + ":" + date.getMinutes();
$('.date').text(day);
$('.time').text(time);

var hour = date.getHours();
var bgColor = '#feefc7';
if (hour >= 5 && hour <= 7) {
    bgColor = '#efa18b';
    $('.sun').css('transform', 'rotate(-150deg) translate(40vw) rotate(-150deg)');
}
else if (hour <= 10) {
    bgColor = '#e3c498';
    $('.sun').css('transform', 'rotate(-120deg) translate(40vw) rotate(-120deg)');
}
else if (hour <= 14) {
    bgColor = '#f6e9d2';
    $('.sun').css('transform', 'rotate(-90deg) translate(40vw) rotate(-90deg)');
}
else if (hour <= 16) {
    bgColor = '#e3c498';
    $('.sun').css('transform', 'rotate(-60deg) translate(40vw) rotate(-60deg)');
    $('.weather').css('left', '10%');
}
else if (hour <= 17) {
    bgColor = '#efa18b';
    $('.sun').css('tranform', 'rotate(-30deg) translate(40vw) rotate(-30deg)');
    $('.weather').css('left', '10%');
}
else if (hour >= 18 || hour < 5) {
    bgColor = '#010a3d';
    $('.sun').css('transform', 'rotate(-90deg) translate(40vw) rotate(-90deg)');
    $('.sun').css('background-color', '#e6dde4');
    $('.date').css('color', '#e6dde4');
    $('.time').css('color', '#e6dde4');
}
$('.container').css('background-color', bgColor);

var cloudy = '<img src="image/cloudy.png">';
var foggy = '<img src="image/foggy.png">';
var hail_rain = '<img src="image/hail_rain.png">';
var heavy_rain = '<img src="image/heavy_rain.png">';
var light_rain = '<img src="image/light_rain.png">';
var light_sun = '<img src="image/light_sun.png">';
var lightning = '<img src="image/lightning.png">';
var moderate_rain = '<img src="image/moderate_rain.png">';
var rainy_sun = '<img src="image/rainy_sun/png">';
var snowy = '<img src="image/snowy.png">';
var storm = '<img src="image/storm.png">';
var sun_foggy = '<img src="image/sun_foggy.png">';
var sun_windy = '<img src="image/sun_windy.png">';
var sunny = '<img src="image/sunny.png">';
var temp = '<img src="image/temp.png">';
var thunder = '<img src="image/thunder.png">';
var tornado = '<img src="image/tornado.png">';
var windy = '<img src="image/windy.png">';