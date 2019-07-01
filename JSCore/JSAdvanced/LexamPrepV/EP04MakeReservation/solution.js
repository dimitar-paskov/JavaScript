function makeReservation(selector) {
    $('#submit').on('click', (event)=>{
        let fullName = $('#fullName').val();
        let email = $('#email').val();
        let phoneNumber = $('#phoneNumber').val();
        let address = $('#address').val();
        let postalCode = $('#postalCode').val();


        if(isNotEmpty(fullName.trim()) && isNotEmpty(email.trim())){
            $('#infoPreview')
                .append($('<li>').text(`Name: ${fullName}`))
                .append($('<li>').text(`E-mail: ${email}`))
                .append($('<li>').text(`Phone: ${phoneNumber}`))
                .append($('<li>').text(`Address: ${address}`))
                .append($('<li>').text(`Postal Code: ${postalCode}`))



            $('#submit').attr("disabled", true);
            $('#edit').attr("disabled", false);
            $('#continue').attr("disabled", false);

            $('#fullName').val('');
            $('#email').val('');
            $('#phoneNumber').val('');
            $('#address').val('');
            $('#postalCode').val('');
        }
    });

    $('#edit').on('click', ()=>{
        let items = $('#infoPreview > li');
        console.log(items.eq(0).text().substring(6));

        let fullName = items.eq(0).text().substring(6);
        let email = items.eq(1).text().substring(8);
        let phoneNumber = items.eq(2).text().substring(7);
        let address = items.eq(3).text().substring(9);
        let postalCode = items.eq(4).text().substring(13);


        $('#fullName').val(fullName);
        $('#email').val(email);
        $('#phoneNumber').val(phoneNumber);
        $('#address').val(address);
        $('#postalCode').val(postalCode);

        $('#infoPreview').empty();


        $('#submit').attr("disabled", false);
        $('#edit').attr("disabled", true);
        $('#continue').attr("disabled", true);
    });

    $('#continue').on('click', ()=>{

        $('#submit').attr("disabled", true);
        $('#edit').attr("disabled", true);
        $('#continue').attr("disabled", true);

        $('#container')
            .append($('<h2>').text('Payment details'))
            .append($('<select>').attr('id', 'paymentOptions').addClass('custom-select')
                .append($('<option selected disabled hidden>Choose</option>'))
                .append($('<option value="creditCard">Credit Card</option>'))
                .append($('<option value="bankTransfer">Bank Transfer</option>')))
            .append($('<div id="extraDetails">'));

        $('#paymentOptions').on('change', ()=>{
            let selection = $( "select option:selected" );

            let button = $('<button id="checkOut">Check Out</button>');
            button.on('click', thankYou);

            $('#extraDetails').empty();

            if (selection.val() === 'creditCard') {
                $('#extraDetails')
                    .append('<div class="inputLabel">Card Number<input></div><br>')
                    .append('<div class="inputLabel">Expiration Date<input></div><br>')
                    .append('<div class="inputLabel">Security Numbers<input></div><br>')
                    .append(button);
            }else if (selection.val()==='bankTransfer') {
                $('#extraDetails')
                    .append('<p>You have 48 hours to transfer the amount to:<br>IBAN: GR96 0810 0010 0000 0123 4567 890</p>')
                    .append(button);
            }



        });

    });

    function thankYou() {
        $('#wrapper').empty();
        $('#wrapper').append($('<h4>').text('Thnak you for your reservation!'));
        // $('#wrapper').empty().append('<h4>Thank you for your reservation!</h4>');

    }

    function isNotEmpty(str) {
        return (str.length !== 0 || str.trim());
    }

}