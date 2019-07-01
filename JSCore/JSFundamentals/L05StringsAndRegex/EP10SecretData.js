// function main(data) {
//     data.forEach(line => {
//
//         let regexName = /\*[A-Z][A-Za-z]*(?=\s|$)/g
//         let regexPhone = /\+[0-9-]{10}(?=\s|$)/g
//         let regexId = /![a-zA-Z0-9]+(?=\s|\t|$)/g
//         let regexBase = /_[0-9A-Za-z]+(?=\s|$)/g
//
//         line = modifyLineByPattern(line, regexName);
//         line = modifyLineByPattern(line, regexPhone);
//         line = modifyLineByPattern(line, regexId);
//         line = modifyLineByPattern(line, regexBase);
//
//
//         console.log(line);
//
//         function modifyLineByPattern(line, pattern) {
//             let matches = line.match(pattern);
//             if (matches) {
//                console.log(matches)
//                     for (let i = 0; i < matches.length; i++) {
//                         line = line.replace(pattern, "|".repeat(matches[i].length));
//                     }
//
//             }
//
//             /*
//             * При теб не се получава понеже има един тест с 2 еднакви думи, но само едната от тях е валидна. Ето част от теста: (_SecretBase) or (_SecretBase ). Първата дума е невалидна по условие а втората е валидна, но ти заменяш първата. Регекса ти правилно прехваща втората но когато направиш text = text.replace('_SecretBase', "|".repeat('_SecretBase'.length)) , се сменя първият _SecretBase а трябва да смениш вторият.
//             *
//             * */
//
//             return line;
//
//         }
//
//     });
// }

function secretDataRegex(input) {
    let regexName = /\*[A-Z][A-Za-z]*(?=\s|$)/g
    let regexPhone = /\+[0-9-]{10}(?=\s|$)/g
    let regexId = /![a-zA-Z0-9]+(?=\s|\t|$)/g
    let regexBase = /_[0-9A-Za-z]+(?=\s|$)/g

    for (let line of input) {
        console.log(line
            .replace(regexName, m => '|'.repeat(m.length))
            .replace(regexPhone, m => '|'.repeat(m.length))
            .replace(regexId, m => '|'.repeat(m.length))
            .replace(regexBase, m => '|'.repeat(m.length))
            .replace()
        )
    }
}






main(['Agent *Ivankov was in the room *I',
    'The person in the room was heavily armed.',
    ' (_SecretBase) or (_SecretBase ) Agent *Ivankov had to act quick in order.',
    'He picked up his phone and called some unknown number.',
    'I think it was +555-46-796',
    'I cant really remember...',
    'He said something about "finishing work" !',
    'with subject !2491a23BVB34Q and returning to Base _Aurora21',
    'Then after that he disappeared from my sight.',
    'As if he vanished in the shadows.',
    'A moment, shorter than a second, later, I saw the person flying off the top floor.',
    'I really dont know what happened there.',
    'This is all I saw, that night.',
    'I cannot explain it myself...']
);