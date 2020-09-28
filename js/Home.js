$(document).ready(function () {
    $(".fa-angle-down").click(function () {
        $(".blockcity").toggleClass("test");
    });
    $(".fa-map-marker-alt").click(function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }
        else {
            alert("Không lấy được vị trí của bạn");
        }
    });
    $("#timenow").text(timenow);
    $(".date").text(timenow);
    $("#timenow").css("font-size", "28px");
    var myChart = document.getElementById("myChart");
    var user = [30, 29, 29, 31, 33, 33, 32, 31];
    var framework = ['11h:PM', '2h:AM', '5h:AM', '8h:AM', '11h:AM', '2h:PM', '5h:PM', '8h:PM'];
    var new_char = new Chart(myChart, {
        type: 'bar',
        data: {
            labels: framework,
            datasets: [{
                label: "Nhiệt Độ Hằng Ngày(h):",
                data: user,
                backgroundColor: [
                    "rgba(66, 213, 138, 0.6)",
                    "rgba(200, 99, 138, 0.6)",
                    "rgba(200, 99, 12, 0.6)",
                    "rgba(51, 25, 120, 0.6)",
                    "rgba(0, 234, 20, 0.6)",
                    "rgba(66, 213, 138, 0.6)",
                    "rgba(66, 213, 138, 0.6)",
                    "rgba(66, 213, 138, 0.6)",
                ],
                borderColor: "rgba(208, 77, 20, 0.8)",
                borderWidth: 1,
            }]
        },
        options: {
            maintainAspectRatio: false,
            responsive: false
        }
    });
    var myChart = document.getElementById("myChart2");
    var user = [30, 29, 29, 31, 33, 33, 32, 31, 29, 29, 30, 31, 37];
    var framework = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
    var new_char = new Chart(myChart, {
        type: 'line',
        data: {
            labels: framework,
            datasets: [{
                label: "Lượng Mưa:",
                data: user,
                backgroundColor: [
                    "rgba(66, 213, 138, 0.6)"
                ],
                borderColor: "rgba(208, 77, 20, 0.8)",
                borderWidth: 2,
            }]
        },
        options: {
            maintainAspectRatio: false,
            responsive: false
        }
    });
}, false);
var date = new Date();
var Today = "";
switch (date.getDay()) {
    case 0: {
        Today = "SunDay";
        break;
    }
    case 1: {
        Today = "MonDay";
        break;
    }
    case 2: {
        Today = "TuesDay";
        break;
    }
    case 3: {
        Today = "WednesDay";
        break;
    }
    case 4: {
        Today = "ThursDay";
        break;
    }
    case 5: {
        Today = "FriDay";
        break;
    }
    case 6: {
        Today = "SaturDay";
        break;
    }
    default: {
        Today = "No Day";
        break;
    }
}
var month = 1 + date.getMonth();
var timenow = Today + "   " + date.getDate() + "-" + month + "-" + date.getFullYear();

var hour = date.getHours();