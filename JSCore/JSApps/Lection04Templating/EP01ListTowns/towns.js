function attachEvents() {
    let source = $("#towns-template").html();
    let template = Handlebars.compile(source);
    
    $('#btnLoadTowns').on('click', loadTowns);

    function loadTowns(event) {
        const towns = $('#towns').val();
        $('#root').empty();
        $('#root').append('<ul>');

        towns.split(', ').forEach(town=>{
            let html = template({town});
            $('#root ul').append(html);
        });
        $('#towns').val('');


    }
    
}

