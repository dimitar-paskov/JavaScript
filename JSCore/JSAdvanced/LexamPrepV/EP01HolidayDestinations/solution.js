function addDestination() {
    let city = $('#input input').eq(0).val();
    let country = $('#input input').eq(1).val();
    let season = $('#seasons option:selected').text();

    if(city !== "" || country !== ''){
        $('#destinationsList')
            .append($("<tr>")
                .append($('<td>').text(city+ ", " + country))
                .append($('<td>').text(season)));

        $(`#${season.toLowerCase()}`).val(+$(`#${season.toLowerCase()}`).val() + 1 );

        $('#input input').eq(0).val('');
        $('#input input').eq(1).val('');
    }



}