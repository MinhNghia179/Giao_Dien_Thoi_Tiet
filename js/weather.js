var values = [[20.436253, 106.174449], [21.025941, 105.823230], [20.845118, 106.682608], [16.061683, 108.197607], [11.929406, 108.423248], [19.092173, 105.473468], [11.001449, 106.700163]];
var keys = ['NamDinh', 'HaNoi', 'HaiPhong', 'DaNang', 'DaLat', 'NgheAn', 'BinhDuong'];
var map = new Map();
for (var i = 0; i < keys.length; i++) {
    map.set(keys[i], values[i]);
    var crea_ele = document.createElement("li");
    crea_ele.className += "ele_city_name";
    crea_ele.innerText = keys[i];
    document.getElementById("itme").appendChild(crea_ele);
}
function search_city() {
    var cityName = document.getElementById("cityname");
    var str_city_name = cityName.value.toUpperCase();
    var city_name_select = document.getElementById('itme');
    var city_name_options = city_name_select.getElementsByClassName('ele_city_name');
    for (var i = 0; i < city_name_options.length; i++) {
        let value_str = city_name_options[i].innerText;
        if (value_str.toUpperCase().indexOf(str_city_name) > -1) {
            city_name_options[i].style.display = "block";
            city_name_options[i].addEventListener('click', function () {
                cityName.value = value_str;
            });
        }
        else {
            city_name_options[i].style.display = "none";
        }
    }
}
function find_city() {
    var lat_lng = document.getElementById("cityname").value;
    var sum ;
    for(var key of map.keys()) {
        if(key == lat_lng) {
            sum = map.get(key);
            break;
        }
    }
    document.getElementById('itme').style.display = "none";
    var cloudy = '<img src="images/cloudy.png">';
    var foggy = '<img src="images/foggy.png">';
    var hail_rain = '<img src="images/hail_rain.png">';
    var heavy_rain = '<img src="images/heavy_rain.png">';
    var light_rain = '<img src="images/light_rain.png">';
    var light_sun = '<img src="images/light_sun.png">';
    var lightning = '<img src="images/lightning.png">';
    var moderate_rain = '<img src="images/moderate_rain.png">';
    var rainy_sun = '<img src="images/rainy_sun/png">';
    var snowy = '<img src="images/snowy.png">';
    var storm = '<img src="images/storm.png">';
    var sun_foggy = '<img src="images/sun_foggy.png">';
    var sun_windy = '<img src="images/sun_windy.png">';
    var sunny = '<img src="images/sunny.png">';
    var temp = '<img src="images/temp.png">';
    var thunder = '<img src="images/thunder.png">';
    var tornado = '<img src="images/tornado.png">';
    var windy = '<img src="images/windy.png">';
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
        icon(action[0]);
    }
    function icon(checkIcon) {
        $('.img-weather').html(checkIcon);
    }
    $.ajax({
        type: 'GET',
        dataType: 'json',
        data: {},
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${sum[0]}&lon=${sum[1]}&exclude=daily&lang=vi&appid=7eb30434805da50cca76833b93c4561c`,
        success: function (data) {
            weather.city = new Date(data.current.dt * 1000);
            $('#city_now').html(weather.city);
            weather.weather = (data.current.weather[0].description).toUpperCase();
            $('#des_now').html(weather.weather);
            weather.weather_id = data.current.weather[0].id;
            checkWeather(weather.weather_id);
            weather.temp = Math.floor(data.current.temp) - 273;
            $('#Temp_value').html(weather.temp + " <sup>o</sup>C");
            weather.feels_like = Math.floor(data.current.feels_like) - 273;
            $('#feels_like').html(weather.feels_like + " <sup>o</sup>C");
            weather.uv = data.current.uvi;
            $('#uv').html(weather.uv + ' UV');
            weather.dew_point = Math.floor(data.current.dew_point) - 273;
            $('#suong').html(weather.dew_point + " <sup>o</sup>C");
            weather.wind_deg = data.current.wind_deg;
            $('#huonggio').html(weather.wind_deg);
            weather.pressure = data.current.pressure;
            $('#press').html(weather.pressure + " <span>mb</span>");
            weather.speed = data.current.wind_speed;
            $('#wind_speed').html(weather.speed + " <span>km/h</span>");
            weather.visibility = data.current.visibility;
            $('#visibi').html(weather.visibility + " m");
            weather.clouds = data.current.clouds;
            $('#Clouds').html(weather.clouds + " %");
            weather.sunrise = new Date(data.current.sunrise * 1000);
            $('#rise').html(weather.sunrise);
            weather.sunset = new Date(data.current.sunset * 1000);
            $('#set').html(weather.sunset);
            weather.humidity = data.current.humidity;
            $('#humidity').html(weather.humidity + " <span>%</span>");
            var arr_temp = [];
            var arr_humidity = [];
            var arr_icon = [];
            var arr_hour = [];
            var arr_clouds = [];
            var arr_feels_like = [];
            var icon_str = 'http://openweathermap.org/img/wn/02d@2x.png';
            for (var i = 0; i < 48; i++) {
                arr_temp[i] = (Math.floor(data.hourly[i].temp) - 273);
                arr_humidity[i] = (data.hourly[i].humidity);
                var time = new Date(data.hourly[i].dt * 1000).getHours();
                arr_hour[i] = (time);
                arr_icon[i] = (`http://openweathermap.org/img/wn/${data.hourly[i].weather[0].icon}@2x.png`);
                arr_clouds[i] = data.hourly[i].clouds;
                arr_feels_like[i] = (Math.floor(data.hourly[i].feels_like) - 273);
            }
            const arr_node = [];
            const col = 48;
            document.getElementById('')
            for (var i = 0; i < col; i++) {
                arr_node[i] = document.createElement("div");
                arr_node[i].className += "Forecast_hour";
                var crea_p_time = document.createElement("p");
                crea_p_time.innerHTML = `${arr_hour[i]}`;
                var crea_p_temp = document.createElement("p");
                crea_p_temp.innerHTML = `${arr_temp[i]}` + ' <sup>o</sup>C';
                var crea_img = document.createElement("img");
                crea_img.src = `${arr_icon[i]}`;
                arr_node[i].append(crea_p_time);
                arr_node[i].append(crea_img);
                arr_node[i].append(crea_p_temp);
                document.getElementById('scroll').appendChild(arr_node[i]);
            }
            var arr_temp_canvas = [];
            var arr_hour_canvas = [];
            var arr_humidity_canvas = [];
            var arr_clouds_canvas = [];
            var arr_feels_like_canvas = [];
            for (var i = 0; i < 24; i++) {
                arr_temp_canvas[i] = arr_temp[i];
                arr_hour_canvas[i] = arr_hour[i];
                arr_humidity_canvas[i] = arr_humidity[i];
                arr_clouds_canvas[i] = arr_clouds[i];
                arr_feels_like_canvas[i] = arr_feels_like[i];
            }
            var myChart = document.getElementById("myChart");
            var ctx = document.getElementById('myChart').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: arr_hour_canvas,
                    datasets: [{
                        label: 'Nhiệt độ',
                        data: arr_temp_canvas,
                        strokeColor: "rgba(255,255,255,1)",
                        pointColor: "rgba(173,173,173,1)",
                        pointStrokeColor: "#fff",
                        backgroundColor: [
                            'rgba(248, 0, 31, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                        ],
                        borderWidth: 2
                    }, {
                        label: 'Độ ẩm',
                        data: arr_humidity_canvas,
                        strokeColor: "rgba(255,255,255,1)",
                        pointColor: "rgba(173,173,173,1)",
                        pointStrokeColor: "#fff",
                        backgroundColor: [
                            'rgba(0, 255, 2, 0.2)',
                        ],
                        borderColor: [
                            'rgba(153, 102, 255, 1)',
                        ],
                        borderWidth: 2
                    },
                    {
                        label: 'Mật Độ Mây',
                        data: arr_clouds_canvas,
                        strokeColor: "rgba(255,255,255,1)",
                        pointColor: "rgba(173,173,173,1)",
                        pointStrokeColor: "#fff",
                        backgroundColor: [
                            'rgba(0, 0, 255, 0.2)',
                        ],
                        borderColor: [
                            'rgba(153, 102, 255, 1)',
                        ],
                        borderWidth: 2
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    },
                }
            });
        }
    });
}