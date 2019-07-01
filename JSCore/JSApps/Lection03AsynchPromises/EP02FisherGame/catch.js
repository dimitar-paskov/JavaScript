function attachEvents() {
    $('button.load').on('click', load);
    $('button.add').on('click', add);

    const urlAll = 'https://baas.kinvey.com/appdata/kid_ByPGhQnCX/biggestCatches';
    const username = 'user';
    const password = 'userpass';

    const base64auth = btoa(username + ":" + password);
    const authHeaders = {
        "Authorization": "Basic " + base64auth,
        "Content-type": "application/json"
    };

    function add() {

        let angler = $('#addForm input.angler').val();
        let weight = +$('#addForm input.weight').val();
        let species = $('#addForm input.species').val();
        let location = $('#addForm input.location').val();
        let bait = $('#addForm input.bait').val();
        let captureTime = +$('#addForm input.captureTime').val();

        let body = {angler,
            weight,
            species,
            location,
            bait,
            captureTime};
        console.log(body);

        $.ajax({
            type: 'post',
            url: `${urlAll}`,
            data:JSON.stringify(body),
            headers: authHeaders
        }).then( addCatch(body))
            .catch(displayError);

    }


    function load() {


        $.ajax({
            url: urlAll,
            headers: authHeaders
        }).then(displayCatches)
            .catch(displayError);

    }

    function displayCatches(catches) {

        $('#catches').empty();
        catches.forEach(x => addCatch(x));


    }

    function addCatch(x) {
        console.log(x.weight);
        let div = $(`<div class="catch" data-id="${x._id}">`);
        let html = $(`<label>Angler</label>
            <input type="text" class="angler" value="${x.angler}"/>
            <label>Weight</label>
            <input type="number" class="weight" value="${x.weight}"/>
            <label>Species</label>
            <input type="text" class="species" value="${x.species}"/>
            <label>Location</label>
            <input type="text" class="location" value="${x.location}"/>
            <label>Bait</label>
            <input type="text" class="bait" value="${x.bait}"/>
            <label>Capture Time</label>
            <input type="number" class="captureTime" value="${x.captureTime}"/>`);
        let bttnUpdate = $('<button class="update">Update</button>');
        let bttnDelete = $('<button class="delete">Delete</button>');
        bttnUpdate.on('click', update);
        bttnDelete.on('click', deleteRecord);

        div.append(html);
        div.append(bttnUpdate);
        div.append(bttnDelete);

        $('#catches').append(div);
    }
    
    function update(event) {
        let id = $(event.target).parent().attr("data-id");
        console.log(id);

        let angler = $(event.target).siblings('input.angler').val();
        let weight = +$(event.target).siblings('input.weight').val();
        let species = $(event.target).siblings('input.species').val();
        let location = $(event.target).siblings('input.location').val();
        let bait = $(event.target).siblings('input.bait').val();
        let captureTime = +$(event.target).siblings('input.captureTime').val();


        let body = {angler,
            weight,
            species,
            location,
            bait,
            captureTime};
        console.log(body);


        $.ajax({
            type: 'put',
            url: `${urlAll}/${id}`,
            data:JSON.stringify(body),
            headers: authHeaders
        }).then( console.log('success'))
            .catch(displayError);


    }
    function deleteRecord(event) {

        let id = $(event.target).parent().attr("data-id");
        console.log(id);

        $.ajax({
            type: 'delete',
            url: `${urlAll}/${id}`,
            headers: authHeaders
        }).then( $(event.target).parent().remove())
            .catch(displayError);


    }

    function displayError(error) {
        console.log(error.statusText);
    }

}