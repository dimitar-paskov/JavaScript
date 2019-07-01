function makeReservation(selector){
    $('#submit').on('click', preview);
    $('#edit').on('click', edit);
    $('#continue').on('click', goOn);

    let $fullName = $('#fullName');
    let $email = $('#email');
    let $phoneNumber = $('#phoneNumber');
    let $address = $('#address');
    let $postalCode = $('#postalCode');
    let $info = $('#infoPreview');

    function preview() {

        let isFullNameOk = isNotEmpty($fullName.val());
        let isEmailOk = isNotEmpty($email.val());


        if ($fullName.val() && $email.val()){
            $info.append($('<li>').text(`Name: ${$fullName.val()}`))
                .append($('<li>').text(`E-mail: ${$email.val()}`))
                .append($('<li>').text(`Phone: ${$phoneNumber.val()}`))
                .append($('<li>').text(`Address: ${$address.val()}`))
                .append($('<li>').text(`Postal Code: ${$postalCode.val()}`));

            $fullName.val('');
            $email.val('');
            $phoneNumber.val('');
            $address.val('');
            $postalCode.val('');

            $('#submit').attr('disabled', 'disabled');
            $('#edit').attr('disabled', false);
            $('#continue').attr('disabled', false);

        }

    }

    function edit() {

        $fullName.val($('#infoPreview li:first').text().slice(6));
        $email.val($('#infoPreview li:nth-child(2)').text().slice(8));
        $phoneNumber.val($('#infoPreview li:nth-child(3)').text().slice(7));
        $address.val($('#infoPreview li:nth-child(4)').text().slice(9));
        $postalCode.val($('#infoPreview li:nth-child(5)').text().slice(13));

        $info.empty();

        $('#submit').attr('disabled', false);
        $('#edit').attr('disabled', 'disabled');
        $('#continue').attr('disabled', 'disabled');


    }
    
    
    function goOn() {

        $('#submit').attr('disabled', 'disabled');
        $('#edit').attr('disabled', 'disabled');
        $('#continue').attr('disabled', 'disabled');

        $('#container').append($('<h2>').text('Payment details'))
            .append($('<select>').attr('id', 'paymentOptions').addClass('custom-select')
                .append('<option selected disabled hidden>Choose</option>')
                .append('<option value="creditCard">Credit Card</option>')
                .append('<option value="bankTransfer">Bank Transfer</option>'))
            .append('<div id="extraDetails"></div>');

        $('#paymentOptions').on('change', draw);

    }

    function draw() {
        let $selection = $( "select option:selected" );
        $('#extraDetails').empty();

        if ($selection.val() === 'creditCard'){
            $('#extraDetails')
                .append($('<div class="inputLabel">Card Number</div>').append('<input>'))
                .append('<br>')
                .append($('<div class="inputLabel">Expiration Date</div>').append('<input>'))
                .append('<br>')
                .append($('<div class="inputLabel">Security Numbers</div>').append('<input>'))
                .append('<br>')
                .append('<button id="checkOut">Check Out</button>');

            $('#checkOut').on('click', thankyou);


        }else if ( $selection.val() === 'bankTransfer'){
            $('#extraDetails')
                .append($('<p>You have 48 hours to transfer the amount to:<br>IBAN: GR96 0810 0010 0000 0123 4567 890</p>'))
                .append('<button id="checkOut">Check Out</button>');

            $('#checkOut').on('click', thankyou);


        }

    }

    function thankyou() {
        $('#wrapper').empty().append('<h4>Thank you for your reservation!</h4>');


    }

    function isNotEmpty(str) {
        return (str.length !== 0 || str.trim());
    }
}