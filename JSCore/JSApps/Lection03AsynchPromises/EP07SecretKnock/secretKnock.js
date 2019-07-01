
const url = 'https://baas.kinvey.com/appdata/kid_BJXTsSi-e/knock?query=';
let message = 'Knock Knock.';
const username = 'guest';
const password = 'guest';

const base64auth = btoa(username + ":" + password);
const authHeaders = {
    "Authorization": "Basic " + base64auth,
    "Content-type": "application/json"
};


function getRequest(message) {
    let ajax = $.ajax({
        type: 'get',
        url: url + message,
        headers: authHeaders
    }).then(displayEvent)
        .catch(displayError);
}

function displayEvent(answer) {
    $('body').append(`<p>${answer.answer}</p>`);
    if (answer.message){
        $('body').append(`<p>${answer.message}</p>`);
    }
    message = answer.message;

    if (message){
        getRequest(message);
    }

}
function displayError(err) {
    console.log('Error')
    console.log(err)
}

getRequest(message);