// function domSearch(selector, isCaseSensitive) {
//     let $doc = $(selector);
//
//     let $divAdd = $('<div>');
//     $divAdd.addClass('add-controls');
//     let $labelA = $('<label>');
//     $labelA.text('Enter text:');
//     $divAdd.append($labelA);
//     let $inputFieldA = $('<input>');
//     $labelA.append($inputFieldA);
//     let $anchor = $('<a>');
//     $anchor.addClass('button');
//     $anchor.text('Add');
//     $anchor.css('display', 'inline-block');
//     $divAdd.append($anchor);
//
//     let $divSearch = $('<div>');
//     $divSearch.addClass('search-controls');
//     let $labelS = $('<label>');
//     $labelS.text('Search:');
//     $divSearch.append($labelS);
//     let $inputFieldS = $('<input>');
//     $labelS.append($inputFieldS);
//
//     let $divResult = $('<div>');
//     $divResult.addClass('result-controls');
//     let $ul = $('<ul>');
//     $ul.addClass('items-list');
//     $divResult.append($ul);
//
//     $anchor.on('click', function () {
//         let item = $inputFieldA.val();
//         if (item.length > 0 && /\S/.test(item)){
//             let $li = $('<li>');
//             $li.addClass('list-item');
//             let $delBttn = $('<a>');
//             $delBttn.addClass('button');
//             $delBttn.text('X');
//             $li.append($delBttn);
//
//             let $strong = $('<strong>');
//             $strong.text(item);
//
//             $li.append($strong);
//
//             $delBttn.on('click', function () {
//                 $delBttn.parent().remove();
//             })
//
//             $ul.append($li);
//
//         }
//         $inputFieldA.val('');
//
//     });
//
//     $inputFieldS.on('keyup', function () {
//         let searched = $inputFieldS.val();
//         // console.log(searched);
//         let $strongs = $('strong');
//         // console.log($strongs);
//         if (isCaseSensitive){
//             $strongs.filter((x, y) => {
//                 return (y.textContent.indexOf(searched) < 0);
//             }).parent().css('display', 'none');
//             $strongs.filter((x, y) => {
//                 return (y.textContent.indexOf(searched) > -1);
//             }).parent().css('display', 'block');
//         }else{
//             searched = searched.toLowerCase();
//             $strongs.filter((x, y) => {
//                 return (y.textContent.indexOf(searched) < 0);
//             }).parent().css('display', 'none');
//             $strongs.filter((x, y) => {
//                 return (y.textContent.toLowerCase().indexOf(searched) > -1);
//             }).parent().css('display', 'block');
//
//         }
//
//     })
//
//
//     $doc.append($divAdd);
//     $doc.append($divSearch);
//     $doc.append($divResult);
//     // console.log($divAdd);
// }
function domSearch(selector, isCaseSensitive) {
    $(selector).append($('<div>').addClass('add-controls').append($('<label>').text("Enter text: ").append($('<input>')))
        .append($('<a>').addClass('button').text('Add').on('click', addItem)));

    $(selector).append($('<div>').addClass('search-controls').append($('<label>').text("Search:").append($('<input>').on('input', search))));

    $(selector).append($('<div>').addClass('result-controls').append($('<ul>').addClass('items-list')));

    function addItem() {
        let text = $('.add-controls label input').val();
        $('.items-list').append($('<li>').addClass('list-item').append($('<a>').addClass('button').text('X').on('click', deleteItem)).append($('<strong>').text(text)));
        $('.add-controls label input').val("");
    }

    function deleteItem() {
        $(this).parent().remove();
    }

    function search() {
        let text = $(this).val();

        $('.list-item').each((index, li) => matches(li, text))
    }

    function matches(li, text) {
        $(li).css('display', 'inline-block');
        if(isCaseSensitive) {
            if ($(li).find('strong').text().indexOf(text) == -1) {
                $(li).css('display', 'none');
            }
        } else {
            if ($(li).find('strong').text().toLowerCase().indexOf(text.toLowerCase()) == -1) {
                $(li).css('display', 'none');
            }
        }
    }
}