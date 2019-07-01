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
    $('#quantity').on('input', checkQuantity);
    $('#submit').on('click', addInventories);


    let capacity ='';
    let price = 0;

    function changeStatusSubmit(event) {

        if (event.target.value === ''){
            $('#submit').attr('disabled', true);
            $('#capacity').val(capacity).prop('class', false);
        } else{
            $('#submit').attr('disabled', false);
            let totalQuantity = capacity + Number($('#quantity').val());
            if (totalQuantity > 150 ){
                $('#capacity').val('full').prop('class', 'fullCapacity');
            }else{
                $('#capacity').val(totalQuantity).prop('class', false);
            }


        }

    }

    function checkQuantity(event) {
        let totalQuantity = capacity + Number(event.target.value);
        console.log(totalQuantity);
        if (totalQuantity > 150 ){
            $('#capacity').val('full').prop('class', 'fullCapacity');
            $('.custom-select').prop('disabled', true);
            $('#price').prop('disabled', true);
            $('#quantity').prop('disabled', true);
        }else{
            $('#capacity').val(totalQuantity).prop('class', false);
            $('.custom-select').prop('disabled', false);
            $('#price').prop('disabled', false);
            $('#quantity').prop('disabled', false);
        }

    }

    function addInventories() {



    }

}
