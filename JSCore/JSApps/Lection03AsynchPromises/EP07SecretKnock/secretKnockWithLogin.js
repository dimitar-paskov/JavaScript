
const url = 'https://baas.kinvey.com/appdata/kid_BJXTsSi-e/knock?query=';
const urlLogin = 'https://baas.kinvey.com/user/kid_BJXTsSi-e/login';
let message = 'Knock Knock.';
const username = 'guest';
const password = 'guest';
let authToken;

const base64auth = btoa('kid_BJXTsSi-e' + ":" + '447b8e7046f048039d95610c1b039390');
const authHeaders = {
    "Authorization": "Basic " + base64auth,
    "Content-type": "application/json"
};
let authHeadersWithToken;




function getToken() {
    console.log("in getToken");
    let ajax = $.ajax({
        type: 'post',
        url: urlLogin,
        headers: authHeaders,
        data:JSON.stringify({
            "username":"guest",
            "password":"guest"
        })
    }).then(assignToken)
        .catch(displayError);
}

function assignToken(answer) {
    console.log('in assignToken');
    authToken = answer._kmd.authtoken;
    console.log(authToken);
    authHeadersWithToken = {
        "Authorization": "Kinvey " + authToken,
        "Content-type": "application/json"
    };
    getRequest(message);

}
getToken();

function getRequest(message) {
    let ajax = $.ajax({
        type: 'get',
        url: url + message,
        headers: authHeadersWithToken
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

