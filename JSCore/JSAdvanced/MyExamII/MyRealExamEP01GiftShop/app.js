function solution() {
	//$('button[type="button"]').on('click', addGift);


	//function addGift() {
        let toyType = $('#toyType').val();
        let toyPrice = $('#toyPrice').val();
        let toyDescription = $('#toyDescription').val();
        
        if (toyType.length > 0 &&
            toyPrice.length > 0 &&
            toyDescription.length > 0 &&
            +toyPrice) {

            let button = $(`<button>Buy it for $${toyPrice}</button>`);
            button.on('click', removeToy);

            $('#christmasGiftShop')
                .append($('<div class="gift">')
                    .append($('<img src="gift.png">'))
                    .append($('<h2>').text(`${toyType}`))
                    .append($('<p>').text(`${toyDescription}`))
                    .append(button));


            $('#toyType').val('');
            $('#toyPrice').val('');
            $('#toyDescription').val('');

            console.log($('#christmasGiftShop').find('h2').text());

        }
        
  //  }

    function removeToy(event) {
	    $(event.target).parent().remove();

    }
}