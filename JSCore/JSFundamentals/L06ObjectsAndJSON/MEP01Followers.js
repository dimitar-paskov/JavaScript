function solve(input) {

    let website = {};

    let i = 0;
    while (input[i] !== "Statistics") {
        if (input[i].indexOf(" followed ") === -1) {
            let user = input[i].split(", ")[1].trim();

            if ((user !== '') && (!website[user])) {
                website[user] = {
                    following: new Set(),
                    followers: new Set(),
                }
            }
        } else {
            let [firstUser, secondUser] = input[i].split(" followed ");

            if (website[firstUser] && website[secondUser] && website[firstUser] !== website[secondUser]) {
                website[firstUser]["following"].add(secondUser);
                website[secondUser]["followers"].add(firstUser);
            }
        }
        i++;
    }

    console.log(`Total users registered: ${Object.keys(website).length}`);
    let ordered = Object.keys(website).sort((a, b) => {
        return website[b]["followers"].size - website[a]["followers"].size || b.localeCompare(a);
    });
    for (let i = 0; i < ordered.length; i++) {
        console.log(`${i + 1}. ${ordered[i]} : ${website[ordered[i]]["following"].size} following, ${website[ordered[i]]["followers"].size} followers`);
        if (i === 0) {
            [...website[ordered[i]]["followers"]].sort().forEach(x => console.log(`*  ${x}`))
        }
    }

}

solve(['Welcome, JennaMarbles',
    'JennaMarbles followed Zoella',
    'Welcome, AmazingPhil',
    'JennaMarbles followed AmazingPhil',
    'Welcome, Zoella',
    'JennaMarbles followed Zoella',
    'Zoella followed AmazingPhil',
    'Christy followed Zoella',
    'Zoella followed Christy',
    'Welcome, JacksGap',
    'JacksGap followed JennaMarbles',
    'Welcome, PewDiePie',
    'Welcome, Zoella',
    'Statistics',])


/*
Chujda - funkcionalno. Pri men trim()-a mi skysa nervite. Na tazi trqbwa da i se dobavi
Veselin Valev Доста функционално решение, и е много приятно за дебъгване 🙂 . Но ми хареса де :). Добави един филтър при сплитването на inputArr -> .map((input) => input.split(" ").filter(x => x !== "")) и става 100%.
Manage
LikeShow more reactions
· Reply · 1d
Daniela Koleva Danailova
Daniela Koleva Danailova Veselin Valev Супер, мерси много!


function solution(inputArr) {
    let subscribersArr = inputArr
        .map((input) => input.split(" ")).filter((e) => [...e].length === 2)
        .reduce((acc, cur) => {
            if (!acc[cur[1]]) {
                acc[cur[1]] = [0];
            }
            return acc;
        }, {});


    inputArr
        .map((input) => input.split(" "))
        .filter((e) => [...e].length === 3)
        .forEach((e) => {
                if (subscribersArr[e[0]]
                    && subscribersArr[e[2]]
                    && !subscribersArr[e[2]].includes(e[0])
                    && e[0] !== e[2]) {

                    subscribersArr[e[2]].push(e[0]);
                    subscribersArr[e[0]][0]++;
                }
            }
        )

    console.log(`Total users registered: ${Object.keys(subscribersArr).length}`);

    let count = 1;
    Object.keys(subscribersArr)
        .sort((a, b) => {
            return subscribersArr[b].length - subscribersArr[a].length || b.localeCompare(a);
        })
        .forEach((key) => {
            console.log(`${count++}. ${key} : ${subscribersArr[key][0]} following, ${subscribersArr[key].length - 1} followers`);
            if (count - 1 === 1) {
                subscribersArr[key].filter((e, i) => i !== 0).sort().forEach((name) => {
                    console.log(`*  ${name}`);
                });
            }

        })
}

*/