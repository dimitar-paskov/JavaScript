function attachEvents() {
    $('#getVenues').on('click', loadEvents);

    const urlPost = 'https://baas.kinvey.com/rpc/kid_BJ_Ke8hZg/custom/calendar?query=';
    const urlGet = 'https://baas.kinvey.com/appdata/kid_BJ_Ke8hZg/venues/';
    const urlFinal = 'https://baas.kinvey.com/rpc/kid_BJ_Ke8hZg/custom/purchase?venue=';

    const username = 'guest';
    const password = 'pass';

    const base64auth = btoa(username + ":" + password);
    const authHeaders = {
        "Authorization": "Basic " + base64auth,
        "Content-type": "application/json"
    };

    function loadEvents(event) {
        let date = $('#venueDate').val();

        $.ajax({
            type: 'post',
            url: urlPost + date,
            headers: authHeaders
        }).then(loadEventsInfo)
            .catch(displayError);


    }

    function loadEventsInfo(eventIds) {
        for (const eventId of eventIds) {

            $.ajax({
                type: 'get',
                url: urlGet + eventId,
                headers: authHeaders
            }).then(displayEvent)
                .catch(displayError);

        }

    }

    function displayEvent(venue) {

        const html = $(`<div class="venue" id="${venue._id}">`);
        const span = $(`<span class="venue-name">${venue.name}</span>`);
        const button = $('<input class="info" type="button" value="More info">');
        const divDetails = $('<div class="venue-details" style="display: none;">');
        button.on('click', () => {
            let display = divDetails.attr('style').substring(9, 13);

            if (display === 'none') {
                divDetails.show();
            } else {
                divDetails.hide();
            }
        });

        const select = $(`<select class="quantity">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option> 
            </select>`);

        const purchaseBtn = $(`<input class="purchase" type="button" value="Purchase">`);
        purchaseBtn.on('click', ()=>{
            let name = venue.name;
            let price = venue.price;
            let qty = select.find(":selected").text();

            const confirmBtn = $(`<input type="button" value="Confirm">`);
            confirmBtn.on('click', ()=>{
                const id = venue._id;

                $.ajax({
                    type: 'post',
                    url: urlFinal + id +'&qty=' + qty ,
                    headers: authHeaders
                }).then(thankYou)
                    .catch(displayError);

            })

            const finalHtml = $(`<span class="head">Confirm purchase</span>
<div class="purchase-info">
<span>${name}</span>
<span>${qty} x ${price}</span>
<span>Total: ${qty * price} lv</span>
</div>`);

            console.log(finalHtml);
            $(finalHtml[2]).append(confirmBtn);

            $('#venue-info').empty();
            $('#venue-info').append(finalHtml);
        });
        const rest = $('<table>')
            .append('<tr><th>Ticket Price</th><th>Quantity</th><th></th></tr>')
            .append($('<tr>')
                .append(`<td class="venue-price">${venue.price} lv</td>`)
                .append($('<td>').append(select))
                .append($('<td>').append(purchaseBtn))
            );




        divDetails.append(rest);
        divDetails.append(`<span class = "head">Venue description:</span>`);
        divDetails.append(`<p class = "description">${venue.description}</p>`);
        divDetails.append(`<p class = "description">Starting time: ${venue.startingHour}</p>`);
        span.prepend(button);
        html.append(span);
        html.append(divDetails);

        $('#venue-info').append(html);


    }

    function thankYou(result) {
        console.log(result.html);
        $('#venue-info').empty();
        $('#venue-info').text('You may print this page as your ticket');
        $('#venue-info').append(result.html);

    }



    function displayError(err) {
        console.log(err);

    }


}

// function attachEvents() {
//     let baseUrl = "https://baas.kinvey.com/";
//     let appId = "kid_BJ_Ke8hZg";
//     let base64Auth = btoa("guest:pass");
//
//     $('#getVenues').click(loadVenues);
//
//     function loadVenues() {
//         let date = $('#venueDate').val();
//
//         let request = {
//             url: baseUrl + "rpc/" + appId + "/custom/calendar?query=" + date,
//             method: "POST",
//             headers : {
//                 "Authorization": "Basic " + base64Auth
//             }
//         };
//
//         $.ajax(request).then(function (venueIds) {
//             for(let venueId of venueIds){
//                 let request = {
//                     method: "GET",
//                     url: baseUrl + "appdata/" + appId + "/venues/" + venueId,
//                     headers: {
//                         "Authorization": "Basic " + base64Auth
//                     }
//                 };
//
//                 $.ajax(request).then(displayVenue);
//             }
//         })
//     }
//
//     function displayVenue(data) {
//         $('#venue-info')
//             .append($('<div>').addClass("venue").attr('id', data._id)
//                 .append($('<span>').addClass("venue-name").text(data.name)
//                     .append($('<input>').addClass("info").attr("type", "button").val("More info").click(showInfo)))
//                 .append($('<div>').addClass("venue-details").css("display", "none")
//                     .append($('<table>')
//                         .append($('<tr>')
//                             .append($('<th>').text("Ticket Price"))
//                             .append($('<th>').text("Quantity"))
//                             .append($('<th>')))
//                         .append($('<tr>')
//                             .append($('<td>').addClass("venue-price").text(`${data.price} lv`))
//                             .append($('<td>')
//                                 .append($('<select>').addClass("quantity")
//                                     .append($('<option>').val("1").text("1"))
//                                     .append($('<option>').val("2").text("2"))
//                                     .append($('<option>').val("3").text("3"))
//                                     .append($('<option>').val("4").text("4"))
//                                     .append($('<option>').val("5").text("5"))))
//                             .append($('<td>')
//                                 .append($('<input>').addClass("purchase").attr("type", "button").val("Purchase").click(purchase)))))
//                     .append($('<span>').addClass("head").text("Venue description:"))
//                     .append($('<p>').addClass("description").text(data.description))
//                     .append($('<p>').addClass("description").text(`Starting time: ${data.startingHour}`))
//                 )
//             );
//     }
//
//     function showInfo() {
//         $('.venue-details').hide();
//         $(this).parent().parent().find('.venue-details').show();
//     }
//
//     function purchase() {
//         let id = $(this).parent().parent().parent().parent().parent().attr('id');
//         let name = $(this).parent().parent().parent().parent().parent().find(".venue-name").text();
//         let qty = Number($(this).parent().parent().find(".quantity").val());
//         let price = Number($(this).parent().parent().find(".venue-price").text().substring(0, $(this).parent().parent().find(".venue-price").text().length-2));
//
//         $('#venue-info').html(`<span class="head">Confirm purchase</span>
// <div class="purchase-info">
//   <span>${name}</span>
//   <span>${qty} x ${price}</span>
//   <span>Total: ${qty * price} lv</span>
//   <input type="button" value="Confirm">
// </div>
// `);
//
//         $('#venue-info input').click(function () {
//             let request = {
//                 method: "POST",
//                 url: baseUrl + "rpc/" + appId + "/custom/purchase?venue=" + id + "&qty=" + qty,
//                 headers: {
//                     "Authorization": "Basic " + base64Auth
//                 }
//             };
//
//             $.ajax(request).then(function (data) {
//                 $('#venue-info').html("You may print this page as your ticket" + data.html);
//             })
//         })
//     }
// }