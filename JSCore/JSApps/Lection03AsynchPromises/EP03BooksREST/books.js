$(function () {

    const url = 'https://baas.kinvey.com/appdata/kid_BkDnYwa0X/books';
    const username = 'user';
    const password = 'userpass';

    const base64auth = btoa(username + ":" + password);
    const authHeaders = {
        "Authorization": "Basic " + base64auth,
        "Content-type": "application/json"
    };

    $('#create').on('click', createBook);
    $('#loadall').on('click', loadall);


    function createBook(event) {
        console.log(event);
        event.stopPropagation();
        event.preventDefault();

        let title = $('#title').val();
        let author = $('#author').val();
        let isbn = $('#isbn').val();

        $.ajax({
            type: 'post',
            url,
            data: JSON.stringify({title, author, isbn}),
            headers: authHeaders
        }).then(showBook({title, author, isbn}))
            .catch();
    }

    function loadall(event) {

        $.ajax({
            type: 'get',
            url,
            headers: authHeaders
        }).then(displayContacts)
            .catch();

    }

    function displayContacts(books) {
        $('#container').empty();
        for (const book of books) {
           showBook(book);

        }
    }

    function showBook(book) {
        console.log(book);
        let title = book.title;
        let author = book.author;
        let isbn = book.isbn;

        let $edit = $('<button>Edit</button>');
        let $delete = $('<button>Delete</button>');

        let span = $(`<span id="${book._id}">`);
        let ul = $('<ul class="book">');
        let titleli = $(`<li>${title}</li>`);
        let authorli = $(`<li>${author}</li>`);
        let isbnli = $(`<li>${isbn}</li>`);

        $delete.on('click', deleteThis);
        $edit.on('click', editThis);

        ul.append(titleli).append(authorli).append(isbnli).append($edit).append($delete);
        span.append(ul);
        $('#container').append(span);

    }

    function deleteThis(event) {

        let id = $(event.target).parent().parent().attr("id");
        console.log(id);

        $.ajax({
            type: 'delete',
            url: `${url}/${id}`,
            headers: authHeaders
        }).then( $(event.target).parent().parent().remove())
            .catch(displayError);

    }
    function editThis(event) {

        let id = $(event.target).parent().parent().attr("id");

        let title = $(event.target).parent().children().eq(0).text();
        let author = $(event.target).parent().children().eq(1).text();
        let isbn = $(event.target).parent().children().eq(2).text();


        let inputTutle = $(`<li><input id="titleEdit${id}" type="text" value="${title}"></li>`);
        let inputAuthor = $(`<li><input id="authorEdit${id}" type="text" value="${author}"></li>`);
        let inputISBN = $(`<li><input id="isbnEdit${id}" type="text" value="${isbn}"></li>`);

        let confirm = $(`<button id="confirm${id}">Confirm</button>`);
        confirm.on('click', confirmEntry);

        $ul = $(event.target).parent()

        $ul.children().eq(0).remove();
        $ul.children().eq(0).remove();
        $ul.children().eq(0).remove();
        $ul.append(inputTutle).append(inputAuthor).append(inputISBN).append(confirm);
        $ul.children().eq(0).remove();
        $(event.target).off('click');
        $ul.children().eq(0).remove();

    }

    function confirmEntry(event) {

        let id = $(event.target).parent().parent().attr("id");
        let $ul = $(event.target).parent();

        let title = $(`#titleEdit${id}`).val();
        let author = $(`#authorEdit${id}`).val();
        let isbn = $(`#isbnEdit${id}`).val();

        $.ajax({
            type: 'put',
            url: `${url}/${id}`,
            data: JSON.stringify({title, author, isbn}),
            headers: authHeaders
        }).then(ready)
            .catch();

        function ready() {
            $(`#confirm${id}`).off('click');
            $ul.empty();


            let $edit = $('<button>Edit</button>');
            let $delete = $('<button>Delete</button>');


            let titleli = $(`<li>${title}</li>`);
            let authorli = $(`<li>${author}</li>`);
            let isbnli = $(`<li>${isbn}</li>`);

            $delete.on('click', deleteThis);
            $edit.on('click', editThis);

            $ul.append(titleli).append(authorli).append(isbnli).append($edit).append($delete);

        }

    }



    function displayError() {

    }


});