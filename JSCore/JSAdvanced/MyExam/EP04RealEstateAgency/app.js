/* function realEstateAgency() {
    $('button[name="regOffer"]').on('click', register);
    $('button[name="findOffer"]').on('click', findOffer);


    function register() {

        let rent = Number($('input[name="apartmentRent"]').val());
        let appType = $('input[name="apartmentType"]').val();
        let commission = Number($('input[name="agencyCommission"]').val());

        let isRentOK = (!isNaN(rent) && rent > 0);
        let isCommissionOK = (!isNaN(commission) && commission >= 0 && commission <= 100);
        let isAppTypeOK = (typeof appType === 'string' && appType.length > 0 && appType.indexOf(":") === -1);

        if (isRentOK && isCommissionOK && isAppTypeOK) {
            let div = $('<div class="apartment">')
                .append(`<p>Rent: ${rent}</p>`)
                .append(`<p>Type: ${appType}</p>`)
                .append(`<p>Commission: ${commission}</p>`);

            $('#building').append(div);

            $('#message').text('Your offer was created successfully.');

        } else {
            $('#message').text('Your offer registration went wrong, try again.');
        }

        $('input[name="apartmentRent"]').val('');
        $('input[name="apartmentType"]').val('');
        $('input[name="agencyCommission"]').val('');

    }

    function findOffer() {

        let budget = Number($('input[name="familyBudget"]').val());
        let familyAppType = $('input[name="familyApartmentType"]').val();
        let familyName = $('input[name="familyName"]').val();

        let isBudgetOK = (!isNaN(budget) && budget > 0);
        let isFamilyAppTypeOK = (typeof familyAppType === 'string' && familyAppType.length > 0);
        let isFamilyNameOK = (typeof familyName === 'string' && familyName.length > 0);

        if (isBudgetOK && isFamilyAppTypeOK && isFamilyNameOK) {
            let apartments = $('.apartment');
            let matchFound = false;


            for (let i = 0; i < apartments.length; i++) {


                let paragraphs = ($(apartments[i]).children('p'));


                let type = familyAppType + "-";
                let rent = 0
                let commission = 0;

                if (paragraphs.length === 3) {
                    console.log(paragraphs);
                    type = paragraphs[1].textContent.substr(6);
                    rent = +paragraphs[0].textContent.substr(6);
                    commission = +paragraphs[2].textContent.substr(12);
                }


                let isRentAchievable = (rent + ((rent * commission) / 100) <= budget);
                // console.log(isRentAchievable);

                console.log(familyAppType);
                console.log(type);

                if (familyAppType === type && isRentAchievable) {
                    console.log(familyAppType);
                    console.log(type);

                    let agencyProfit = +$('h1').text().split(" ")[2];

                    let button = $('<button>MoveOut</button>').on('click', (event) => {
                        event.target.parentNode.remove();
                        $('#message').text(`They had found cockroaches in ${familyName}'s apartment`);

                    });

                    $(`.apartment:eq(${i})`).css('border', '2px solid red').empty()
                        .append(`<p>${familyName}</p>`)
                        .append('<p>live here now</p>')
                        .append(button);

                    agencyProfit += ((rent * commission) / 100);
                    $('h1').text(`Agency profit: ${agencyProfit} lv.`)

                    $('#message').text('Enjoy your new home! :))');
                    matchFound = true;
                    break;

                }


                console.log(`end loop ${i}`);
            }

            if (!matchFound) {
                $('#message').text('We were unable to find you a home, so sorry :(');
            }

        } else {
            // $('#message').text('We were unable to find you a home, so sorry :(');
        }

        $('input[name="familyBudget"]').val('');
        $('input[name="familyApartmentType"]').val('');
        $('input[name="familyName"]').val('');

    }

}
*/

//  function realEstateAgency() {
// 	$('#findOffer button').on('click', () => {
// 		let $budget = $('#findOffer').children()[1];
// 		let $type = $('#findOffer').children()[2];
// 		let $name = $('#findOffer').children()[3];
//
// 		if (+$budget.value > 0 && $type.value !== '' && $name.value !== '') {
// 			let foundIndex = -1;
//
// 			$('.apartment').toArray().forEach((el, ind) => {
// 				let appPrice = $(el).children()[2].textContent.match(/\d+/g);
// 				if (($(el).html()).includes(`Type: ${$type.value}`) && +$budget.value >= +appPrice[0]) {
// 					let $element = $('.apartment').toArray()[ind];
//
// 					$($element).children('p').remove();
// 					$($element)
// 						.append(`<p>${$name.value}</p>`)
// 						.append(`<p>live here now</p>`);
//
// 					let $moveOutButton = $('<button>').text('MoveOut');
// 					$moveOutButton.on('click', (e) => {
// 						let familyName = e.target.previousSibling.previousSibling.textContent;
// 						$('#message').text(`They had found cockroaches in ${familyName}\'s apartment`);
//
// 						e.target.parentElement.remove();
// 					});
//
// 					$($element).append($moveOutButton);
//
// 					$($element).css('style', 'border: 2px solid red;');
// 					foundIndex = ind;
//
// 					$('#message').text('Enjoy your new home! :))');
// 				}
// 			})
//
// 			if (foundIndex === -1) {
// 				$('#message').text('We were unable to find you a home, so sorry :(');
// 			}
// 		}
//
// 		$budget.value = '';
// 		$type.value = '';
// 		$name.value = '';
// 	});
//
// 	$('#regOffer button').on('click', () => {
// 		let $price = $('#regOffer').children()[1];
// 		let $type = $('#regOffer').children()[2];
// 		let $rate = $('#regOffer').children()[3];
//
// 		let message = '';
//
// 		if (Number.isInteger(+$price.value) &&
// 			Number.isInteger(+$rate.value) &&
// 			$type.value !== '' &&
// 			+$price.value > 0 &&
// 			+$rate.value >= 0 &&
// 			+$rate.value <= 100 &&
// 			!$type.value.includes(':')) {
// 			$('#message').text('Your offer was created successfully.');
//
// 			let $app = $('<div>')
// 				.addClass('apartment')
// 				.append(`<p>Rent: ${$price.value}</p>`)
// 				.append(`<p>Type: ${	$type.value}</p>`)
// 				.append(`<p>Commission: ${$rate.value}</p>`);
//
// 			$('#building').append($app);
// 		} else {
// 			$('#message').text('Your offer registration went wrong, try again.');
// 		}
//
// 		$price.value = '';
// 		$rate.value = '';
// 		$type.value = '';
// 	});
// }

function realEstateAgency() {

    let offers = [];
    let profit = 0;

    $('button[name=regOffer]').on('click', function () {
        let price = +$('input[name=apartmentRent]').val();
        let type = $('input[name=apartmentType]').val();
        let commission = +$('input[name=agencyCommission]').val();

        if (!isNaN(price) && !isNaN(commission) && commission >= 0 && commission <= 100 && price>0 && type.trim() && !type.includes(":")) {

            $('#building').append('<div class="apartment">');
            $('.apartment').last().append(`<p>Rent: ${price}<p>Type: ${type}<p>Commission: ${commission}`);

            $('#message').text('Your offer was created successfully.');
            offers.push({
                price,
                type,
                commission
            });
        } else {
            $('#message').text('Your offer registration went wrong, try again.');
        }

        $('input[name=apartmentRent]').val('');
        $('input[name=apartmentType]').val('');
        $('input[name=agencyCommission]').val('');
        price = '';
        type = '';
        commission = '';

    });

    $('button[name=findOffer]').on('click', function () {
        let budget = +$('input[name=familyBudget]').val();
        let type = $('input[name=familyApartmentType]').val();
        let name = $('input[name=familyName]').val();

        if (!isNaN(budget) && budget > 0 && type.trim() && name.trim()) {

            let isMatch = false;

            for (let i = 0; i < offers.length; i++) {
                let commission = (offers[i].commission / 100) * offers[i].price;
                profit = 2 * commission;
                if (type === offers[i].type && budget >= offers[i].price + commission) {

                    $('#roof h1').text(`Agency profit: ${profit}lv.`);

                    let button = $('<button>MoveOut</button>').on('click', (event) => {
                        $('#message').text(`They had found cockroaches in ${event.target.previousSibling.previousSibling.textContent}'s apartment`);
                        event.target.parentNode.remove();

                    });

                    //loop through apartments
                    $(".apartment").find(`p:contains(${type})`).eq(0).parent().empty()
                        .append(`<p>${name}<p>Live here now</p>`)
                        .css("border", "2px solid red")
                        .append(button);

                    $('#message').text('Enjoy your new home! :))');
                    isMatch = true;
                    break;
                } else {
                    // $("#message").text("We were unable to find you a home, so sorry 😞")
                }



            }
            if (!isMatch){
                $("#message").text("We were unable to find you a home, so sorry 😞")
            }
            //on click remove the apartment
            // $('.apartment button').on('click', function () {
            //     name = $(this).closest('.apartment').find("p:first").text();
            //
            //     $(this).closest('.apartment').remove();
            //     $('#message').text(`They had found cockroaches in ${name}'s apartment`);
            // });
        }
        $('input[name=familyBudget]').val('');
        $('input[name=familyApartmentType]').val('');
        $('input[name=familyName]').val('');

    });

}