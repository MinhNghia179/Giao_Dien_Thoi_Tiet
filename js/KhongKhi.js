$(document).ready(function () {
    var myChart = document.getElementById("myChart");
    var user = [30, 29, 29, 31, 33, 33, 32, 31, 33, 23, 5, 67, 12, 34, 45, 12, 33, 12, 34, 45, 12, 53, 64, 12, 34, 23];
    var framework = ['1h:AM', '2h:AM', '3h:AM', '4h:AM', '5h:AM', '6h:AM', '7h:AM', '8h:AM', '9h:AM', '10h:AM', '11h:AM', '12h:AM', '1h:PM', '2h:PM', '3h:PM', '4h:PM', '5h:PM', '6h:PM', '7h:PM', '8h:PM', '9h:PM', '10h:PM', '11h:PM', '12h:PM'];
    var new_char = new Chart(myChart, {
        type: 'line',
        data: {
            labels: framework,
            datasets: [{
                label: "Chất Lượng Không Khí Theo H():",
                data: user,
                backgroundColor: [
                    "rgba(66, 213, 138, 0.6)"
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
    document.getElementById("default").click();
});
function open_air(table_name) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (var i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace("active", "");
    }
    document.getElementById(table_name).style.display = "block";
}