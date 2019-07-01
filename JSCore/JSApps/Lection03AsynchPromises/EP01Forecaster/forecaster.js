function attachEvents() {
    $('#submit').on('click', getInfo);

    let urlLocations = 'https://judgetests.firebaseio.com/locations.json';

    let wetherSymbols = {
        Sunny: '☀',
        'Partly sunny': '⛅',
        Overcast: '☁',
        Rain: '☂',
        Degrees: '°'
    };


    function getInfo() {


        $.ajax(urlLocations)
            .then(process)
            .catch(displayError);
    }

    function process(result) {
        console.log("'Process")

        $('#forecast').css('display', 'block');
        let city = $('#location').val();

        let code = ((result.filter(x => x.name === city)[0].code));

        let urlToday = `https://judgetests.firebaseio.com/forecast/today/${code}.json`;
        let urlUpcoming = `https://judgetests.firebaseio.com/forecast/upcoming/${code}.json`;

        Promise.all([$.ajax(urlToday), $.ajax(urlUpcoming)])
            .then(displayWeather)
            .catch(displayError);

    }

    function displayWeather([today, upcoming]) {
        console.log(today);
        console.log(upcoming);
        $('#forecast').empty();
        $('#forecast').append($('<div id="current">').append($('<div class="label">Current conditions</div>')));
        $('#forecast').append($('<div id="upcoming">').append($('<div class="label">Three-day forecast</div>')));
        $('#current')

            .append($('<span>').addClass('condition symbol').text(wetherSymbols[today.forecast.condition]))
            .append($('<span class="condition">')
                .append($('<span class="forecast-data">').text(today.name))
                .append($('<span class="forecast-data">').text(today.forecast.low + wetherSymbols.Degrees + '/' + today.forecast.high + wetherSymbols.Degrees))
                .append($('<span class="forecast-data">').text(today.forecast.condition)));

        for (forecast of upcoming.forecast) {
            let spanUpcoming = $('<span class="upcoming">');
            spanUpcoming.append($('<span class="symbol">').text(wetherSymbols[forecast.condition]));
            spanUpcoming.append($('<span class="forecast-data">').text(forecast.low + wetherSymbols.Degrees + '/' + forecast.high + wetherSymbols.Degrees))
            spanUpcoming.append($('<span class="forecast-data">').text(forecast.condition));
            $('#upcoming')
                .append(spanUpcoming);
        }

    }

    function displayError(error) {
        $('#forecast').text('Error');

    }

}