// function wikiParser() {
//     let text = $('#wiki').text();
//
//     let regexTripleQuotes = /'''(.*?)'''/g;
//     let regexDoubleQuotes = /''(.*?)''/g;
//     let regexTripleEqual = /===(.*?)===/g;
//     let regexDoubleEqual = /==(.*?)==/g;
//     let regexEqual = /=(.*?)=/g;
//     let regexPipeLink = /\[\[[^\]]*?\|(.*?)]]/g;
//     let regexLink = /\[\[(.*?)]]/g;
//
//     $('#wiki').html(text.replace(regexTripleQuotes, m=> "<b>" + Array.from(m).splice(3, m.length-6).join('') + "</b>")
//                     .replace(regexDoubleQuotes, m=> "<i>" + Array.from(m).splice(2, m.length-4).join('') + "</i>")
//                     .replace(regexTripleEqual, m=> "<h3>" + Array.from(m).splice(3, m.length-6).join('') + "</h3>")
//                     .replace(regexDoubleEqual, m=> "<h2>" + Array.from(m).splice(2, m.length-4).join('') + "</h2>")
//                     .replace(regexEqual, m=> "<h1>" + Array.from(m).splice(1, m.length-2).join('') + "</h1>")
//                     .replace(regexPipeLink, m=> '<a href="/wiki/link">'
//                         + Array.from(m).splice(2, m.length-4).join('').split("|")[1]
//                         + "<\/a>")
//                     .replace(regexLink, m=> '<a href="/wiki/link">'
//                         + Array.from(m).splice(2, m.length-4).join('')
//                         + "<\/a>"));
//
//     // console.log(text);
//
// }

function wikiParser(selector) {
    let text = $(selector).text();
    let formatted = text
        .replace(/===([^='\[]+?)===/g, (m, g) => `<h3>${g}</h3>`)
        .replace(/==([^='\[]+?)==/g, (m, g) => `<h2>${g}</h2>`)
        .replace(/=([^='\[]+?)=/g, (m, g) => `<h1>${g}</h1>`)
        .replace(/'''([^'=\[]+?)'''/g, (m, g) => `<b>${g}</b>`)
        .replace(/''([^'=\[]+?)''/g, (m, g) => `<i>${g}</i>`)
        .replace(/\[\[([^'=\[\]]+?)\|([^'=\[\]]+?)]]/g, (m, g1, g2) => `<a href="/wiki/${g1}">${g2}</a>`)
        .replace(/\[\[([^'=\[\]]+?)]]/g, (m, g) => `<a href="/wiki/${g}">${g}</a>`);

    $(selector).html(formatted);
}