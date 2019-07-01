(function createBook(selector, title, author, isbn) {
    let id = 1;
    return function (selector, title, author, isbn) {
        let container = $(selector);
        let fragment = document.createDocumentFragment();
        let $div = $('<div>');
        $div.attr('id', "book"+`${id++}`);
        $div.css('border', 'medium none')
        let $pTitle = $(`<p>${title}</p>`);
        $pTitle.addClass('title');
        $pTitle.appendTo($div);
        $pAuthor = $(`<p>${author}</p>`);
        $pAuthor.addClass('author');
        $pAuthor.appendTo($div);
        $pISBN = $(`<p>${isbn}</p>`);
        $pISBN.addClass('isbn');
        $pISBN.appendTo($div);
        let $buttonS = $('<button>Select</button>');
        $buttonS.appendTo($div);
        $buttonD = $('<button>Deselect</button>');

        $buttonD.appendTo($div);
        $div.appendTo(fragment);
        container.append(fragment);

        $buttonS.on("click", select);
        $buttonD.on("click", deselect);
        function select(e){
            // e.preventDefault();
            // e.stopPropagation();
            // let $divA = $(e.target).parent();
            $div.css('border', '2px solid blue');

        }
        function deselect(e){
            // e.preventDefault();
            // e.stopPropagation();
            // let $divA = $(e.target).parent();
            $div.css('border', '');
        }


    }
})();
