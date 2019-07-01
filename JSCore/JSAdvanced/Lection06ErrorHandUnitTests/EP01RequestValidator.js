validateRequest({
    method: 'GET',
    uri: 'asdsd',
    version: 'HTTP/1.1',
    message: '<script>alert("xss vulnerable")</script>\n' +
    '\\r\\n\n' +
    '&copy;\n' +
    '"value"\n' +
    '\'; DROP TABLE'
});

function validateRequest(request) {
    let method = 'method';
    let uri = 'uri';
    let version = 'version';
    let message = 'message';

    let uriPattern = /^[A-Za-z\.\n0-9]*$/g;
    let isUriOK = uriPattern.test(request[uri]);
    let messagePattern = /^[^<>&'"\\]*$/g;
    let isMessageOK = messagePattern.test(request[message]);


    let isMethodOK = (request[method] === 'GET' ||
        request[method] === 'POST' ||
        request[method] === 'DELETE' ||
        request[method] === 'CONNECT');

    let isVersionOK = (request[version] === 'HTTP/0.9' ||
        request[version] === 'HTTP/1.0' ||
        request[version] === 'HTTP/1.1' ||
        request[version] === 'HTTP/2.0');


    if (!request.hasOwnProperty(method) || !isMethodOK) {
        throw new Error("Invalid request header: Invalid Method");
    } else if (!request[uri] || !isUriOK) {
        throw new Error("Invalid request header: Invalid URI");
    } else if (!request.hasOwnProperty(version) || !isVersionOK) {
        throw new Error("Invalid request header: Invalid Version");
    } else if (!request.hasOwnProperty(message) || !isMessageOK) {
        throw new Error("Invalid request header: Invalid Message");
    }


    return request;
}