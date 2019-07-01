function onlineShop(selector) {
    let form = `<div id="header">Online Shop Inventory</div>
    <div class="block">
        <label class="field">Product details:</label>
        <br>
        <input placeholder="Enter product" class="custom-select">
        <input class="input1" id="price" type="number" min="1" max="999999" value="1"><label class="text">BGN</label>
        <input class="input1" id="quantity" type="number" min="1" value="1"><label class="text">Qty.</label>
        <button id="submit" class="button" disabled>Submit</button>
        <br><br>
        <label class="field">Inventory:</label>
        <br>
        <ul class="display">
        </ul>
        <br>
        <label class="field">Capacity:</label><input id="capacity" readonly>
        <label class="field">(maximum capacity is 150 items.)</label>
        <br>
        <label class="field">Price:</label><input id="sum" readonly>
        <label class="field">BGN</label>
    </div>`;
    $(selector).html(form);

    $('.custom-select').on('input', changeStatusSubmit);
    $('#submit').on('click', addInventories);


    let capacity =0;
    let price = 0;

    function changeStatusSubmit(event) {

        if (event.target.value === ''){
            $('#submit').attr('disabled', true);
        } else{
            $('#submit').attr('disabled', false);
        }

    }



    function addInventories() {
        let product = $('.custom-select').val();
        let priceItem = $('#price').val();
        let quantityItem = $('#quantity').val();

        price += Number(priceItem);
        capacity += Number(quantityItem);

        $('.display').append(`<li>Product: ${product} Price: ${priceItem} Quantity: ${quantityItem}</li>`);

        $('#price').val("1");
        $('#quantity').val("1");
        $('.custom-select').val('');
        $('#submit').attr('disabled', true);


        if (capacity >= 150 ){
            $('#capacity').val('full').prop('class', 'fullCapacity');
            $('#sum').val(price);
            $('.custom-select').prop('disabled', true);
            $('#price').prop('disabled', true);
            $('#quantity').prop('disabled', true);

        }else {
            $('#capacity').val(capacity).prop('class', false);
            $('#sum').val(price);
        }

    }

}
