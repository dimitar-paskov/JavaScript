function realEstateAgency() {
    $('button[name="regOffer"]').on('click', regOffer);
    $('button[name="findOffer"]').on('click', findOffer);


    function regOffer(event) {
        let apartmentRent = $('input[name="apartmentRent"]').val();
        let apartmentType = $('input[name="apartmentType"]').val();
        let agencyCommission = $('input[name="agencyCommission"]').val();

        if (apartmentRent.trim().length > 0
            && apartmentType.trim().length > 0
            && agencyCommission.trim().length > 0
            && +apartmentRent > 0
            && +agencyCommission >= 0
            && +agencyCommission <= 100
            && apartmentType.indexOf(':') === -1) {

            let div = $('<div class="apartment">')
                .append($('<p>').text(`Rent: ${apartmentRent}`))
                .append($('<p>').text(`Type: ${apartmentType}`))
                .append($('<p>').text(`Commission: ${agencyCommission}`));

            $('#building').append(div);
            $('#message').text('Your offer was created successfully.');

        } else {
            $('#message').text('Your offer registration went wrong, try again.');
        }

        $('input[name="apartmentRent"]').val('');
        $('input[name="apartmentType"]').val('');
        $('input[name="agencyCommission"]').val('');

    }

    function findOffer(event) {
        let familyBudget = $('input[name="familyBudget"]').val();
        let familyApartmentType = $('input[name="familyApartmentType"]').val();
        let familyName = $('input[name="familyName"]').val();

        if (familyBudget.trim().length > 0
        && familyApartmentType.trim().length > 0
        && familyName.trim().length > 0
        && +familyBudget > 0) {
            let apartmentsDivs = $('div .apartment');
            let isNotFound = true;
            
            for (let i = 0; i < apartmentsDivs.length; i++){
                console.log($(apartmentsDivs[i]).find('p').eq(0).text());
                console.log($(apartmentsDivs[i]).find('p').eq(1).text());
                console.log($(apartmentsDivs[i]).find('p').eq(2).text());

                let rent = +($(apartmentsDivs[i]).find('p').eq(0).text().split(': ')[1]);
                let commissionPercent = +($(apartmentsDivs[i]).find('p').eq(2).text().split(': ')[1]);

                let commission = (rent * commissionPercent)/100 ;
                console.log("Commision: " + commission);
                let cost = rent + commission;
                console.log("Cost " + cost);

                console.log($(apartmentsDivs[i]).find('p').eq(1).text().split(" ")[1]);
                console.log(familyApartmentType);

                if ($(apartmentsDivs[i]).find('p').eq(1).text().split(' ')[1] === familyApartmentType
                    && cost <= +familyBudget){
                    console.log("Inside if");

                    $('#message').text('Enjoy your new home! :))');
                    console.log($('#roof').find('h1').text().split(' ')[2]);
                    let profit = +$('#roof').find('h1').text().split(' ')[2];
                    profit += commission*2;
                    $('#roof').find('h1').text(`Agency profit: ${+profit.toFixed(2)} lv.`);

                    let button = $('<button>MoveOut</button>');
                    button.on('click', (event)=>{
                        $(event.target).parent().remove();
                        let fName = $(event.target).prev().prev().text();
                        $('#message').text(`They had found cockroaches in ${fName}'s apartment`);
                    });
                    $(apartmentsDivs[i]).css('border', '2px solid red');
                    $(apartmentsDivs[i]).empty()
                        .append($('<p>').text(`${familyName}`))
                        .append($('<p>').text('live here now'))
                        .append(button);

                    isNotFound = false;
                    break;


                }
            }

            if (isNotFound){
                $('#message').text('We were unable to find you a home, so sorry :(');
            }


        }else{
            $('#message').text('We were unable to find you a home, so sorry :(');
        }

        $('input[name="familyBudget"]').val('');
        $('input[name="familyApartmentType"]').val('');
        $('input[name="familyName"]').val('');

    }

}