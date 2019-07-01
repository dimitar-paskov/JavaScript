function acceptance() {
	let company = $('input[name="shippingCompany"]').val();
	let product = $('input[name="productName"]').val();
	let quantity = $('input[name="productQuantity"]').val();
	let scrape = $('input[name="productScrape"]').val();

	if (company !== '' && product !== '' && quantity.trim().length > 0 && scrape.trim().length > 0 && +quantity !== NaN && +scrape !== NaN){
        let realQuantity = quantity - scrape;
	    if ((realQuantity) > 0){
	        let button = $('<button type="button">Out of stock</button>');
	        button.on('click', (event)=>{
                $(event.target).parent().remove();
            });
            $('#warehouse')
                .append($('<div>')
                    .append($('<p>').text(`[${company}] ${product} - ${realQuantity} pieces`))
                    .append(button));

        }

        $('input[name="shippingCompany"]').val('');
        $('input[name="productName"]').val('');
        $('input[name="productQuantity"]').val('');
        $('input[name="productScrape"]').val('');
    }

    console.log(company);
}