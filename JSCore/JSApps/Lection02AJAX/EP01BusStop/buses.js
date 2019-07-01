function getInfo() {
    let stopId = $('#stopId').val();

    let baseServiceUrl =
        `https://judgetests.firebaseio.com/businfo/${stopId}.json`;
    console.log(baseServiceUrl);
    $.ajax(baseServiceUrl).then(success, fail);

    function success(busstop) {
        $('#stopName').text('');
        let name = busstop.name;
        console.log(name);
        $('#stopName').text(name);
        let list = $('#buses');
        list.empty();
        
        for (busId in busstop['buses']){
            let li = $('<li>').text(`Bus ${busId} arrives in ${busstop['buses'][busId]} minutes`)
            list.append(li);
        }


    }

    function fail(data, status) {
        $('#stopName').text('');
        let list = $('#buses');
        list.empty();
        $('#stopName').text('Error');
    }

}