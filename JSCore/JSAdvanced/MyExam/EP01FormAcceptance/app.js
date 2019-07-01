function acceptance() {
    let company = $('input[name="shippingCompany"]').val();
    let product = $('input[name="productName"]').val();
    let quantity = Number($('input[name="productQuantity"]').val());
    let scrape = Number($('input[name="productScrape"]').val());

    if (typeof company === 'string'
        && typeof product === 'string'
        && company.length > 0
        && product.length > 0
        && !isNaN(quantity)
        && !isNaN(scrape)
    ) {


        let availableQuantity = quantity - scrape;
        if (availableQuantity > 0){

            let div = $('<div>');
            let p = $(`<p>[${company}] ${product} - ${availableQuantity} pieces</p>`);
            let button = $('<button type="button">Out of stock</button>');
            button.on('click', (event)=>{
                event.target.parentNode.remove();
            });


            div.append(p);
            div.append(button);
            $('#warehouse').append(div);

        }

        $('input[name="shippingCompany"]').val('');
        $('input[name="productName"]').val('');
        $('input[name="productQuantity"]').val('');
        $('input[name="productScrape"]').val('');

    }
}