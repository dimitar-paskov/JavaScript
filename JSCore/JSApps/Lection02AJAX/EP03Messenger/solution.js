// function attachEvents() {
//     let baseServiceUrl = "https://messenger-b10ae.firebaseio.com/messenger";
//
//     function loadMessages() {
//         $.get(baseServiceUrl + ".json")
//             .then(displayMessages);
//     }
//
//     function displayMessages(messages) {
//         $('#messages').empty();
//         let orderedMessages = {};
//         messages = Object.keys(messages).sort((a,b) => a.timestamp - b.timestamp).forEach(k => orderedMessages[k] = messages[k]);
//         for(let message of Object.keys(orderedMessages)){
//             $('#messages').append(`${orderedMessages[message]['author']}: ${orderedMessages[message]['content']}\n`);
//         }
//     }
//
//     function createMessage() {
//         let data = {
//             author:$('#author').val(),
//             content: $('#content').val(),
//             timestamp: Date.now()
//         };
//
//         $.post(baseServiceUrl + ".json", JSON.stringify(data))
//             .then(loadMessages)
//     }
//
//     $('#submit').click(createMessage);
//     $('#refresh').click(loadMessages);
//
//     loadMessages();
// }




function attachEvents() {
    $('#submit').on('click', send);
    $('#refresh').on('click', refresh);

    let serviceURL = 'https://messenger-b10ae.firebaseio.com/messenger.json';
    // refresh();

    function send() {
        let authorName = $('#author').val();
        let message = $('#content').val();
        let params = `{
    "author" : "${authorName}",
    "content" : "${message}",
    "timestamp" : ${Date.now()}
    }`;
        $.ajax({
            url: serviceURL,
            method: 'POST',
            // contentType: "application/json",
            data: params
        }).then(success, fail);
        function success() {
            refresh();
        }
        function fail(err, data) {
        }
    }

    function refresh() {
        $.ajax(serviceURL).then(successtwo, failtwo);
        function successtwo(data) {
            $('#messages').empty();
            Object.values(data).sort((a, b) => {
                return a['timestamp'] - b['timestamp'];
            }).forEach(x=>{
                $('#messages').append(`${x['author']}: ${x['content']}\n`);
            });

        }
        function failtwo(err, data) {
        }
    }
}










// function attachEvents() {
//     $('#submit').click(send);
//     $('#refresh').click(refresh);
//
//     let url = "https://messenger-b10ae.firebaseio.com/messenger.json";
//
//     function send() {
//         let message = {
//             author: $('#author').val(),
//             content: $('#content').val(),
//             timestamp: Date.now()
//         };
//         $.post(url,JSON.stringify(message)).then(refresh);
//     }
//     function refresh() {
//         $.get(url)
//             .then((result)=> {
//                 $('#messages').val(' ');
//                 let keys = Object.keys(result).sort((m1, m2)=>result[m1].timestamp - result[m2].timestamp);
//                 for (let msg in result) {
//                     $('#messages').append(`${result[msg].author}: ${result[msg].content}\n`)
//                 }
//             });
//     }
//
// }