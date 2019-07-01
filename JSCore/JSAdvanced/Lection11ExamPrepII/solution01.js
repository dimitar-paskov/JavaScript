function addSticker() {

    let title = $('.title').val();
    let text = $('.content').val();

    if (title && text) {
        let closeLink = $('<a class="button">x</a>');
        closeLink.on('click', deleteMe);
        let $ul = $('#sticker-list');
        let $li = $('<li>').addClass('note-content')
            .append(closeLink)
            .append(`<h2>${title}</h2>`)
            .append('<hr>')
            .append($('<p>').text(text));

        $ul.append($li);
        $('.title').val('');
        $('.content').val('');

    }

    function deleteMe(event) {
        event.target.parentNode.remove();
    }
}