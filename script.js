document.getElementById("weatherForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var city = document.getElementById("citySelect").value;
    if (city === "") {
        alert("Wybierz miasto!");
        return;
    }

    fetchData(city);
});

function fetchData(city) {
    var url = getApiUrl(city);
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
            var data = JSON.parse(request.responseText);
            console.log(data);
            displayWeatherData(data);
        }
    };
    request.send();
}

function getApiUrl(city) {
    var apiUrl = "";
    switch (city) {
        case "lublin":
            apiUrl = "https://danepubliczne.imgw.pl/api/data/synop/station/lublin";
            break;
        case "krakow":
            apiUrl = "https://danepubliczne.imgw.pl/api/data/synop/station/krakow";
            break;
        case "kielce":
            apiUrl = "https://danepubliczne.imgw.pl/api/data/synop/station/kielce";
            break;
        default:
            apiUrl = "";
    }
    return apiUrl;
}

function displayWeatherData(data) {
    var weatherDataElement = document.getElementById("weatherData");
    weatherDataElement.innerHTML = "";
    if (data && data.data_pomiaru && data.temperatura && data.suma_opadu && data.cisnienie) {
        var measurementDate = data.data_pomiaru;
        var temperature = data.temperatura;
        var precipitation = data.suma_opadu;
        var pressure = data.cisnienie;

        var measurementDiv = document.createElement("div");
        measurementDiv.innerHTML = "<strong>Data pomiaru:</strong> " + measurementDate + "<br>" +
                                   "<strong>Temperatura:</strong> " + temperature + " °C<br>" +
                                   "<strong>Suma opadu:</strong> " + precipitation + " mm<br>" +
                                   "<strong>Ciśnienie:</strong> " + pressure + " hPa";
        weatherDataElement.appendChild(measurementDiv);
    } else {
        weatherDataElement.innerHTML = "Brak danych pogodowych.";
    }
}

$('.slider').slick({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  });

