function main(input) {
    let html = "<table>\n";
    for (let i = 0; i < input.length; i++){
        let obj = JSON.parse(input[i]);
        html += `    <tr>\n`+
                `        <td>${htmlEscape(obj['name'])}</td>\n` +
                `        <td>${htmlEscape(obj['position'])}</td>\n`+
                `        <td>${htmlEscape(obj['salary'])}</td>\n`+
                `    <tr>\n`;

    }

    return html + "</table>";

    function htmlEscape(text) {
        return text.toString()
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}


console.log(main(['{"name":"Pesho","position":"Promenliva","salary":100000}',
    '{"name":"Teo","position":"Lecturer","salary":1000}',
    '{"name":"Georgi","position":"Lecturer","salary":1000}']));