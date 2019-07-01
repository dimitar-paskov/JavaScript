function main(input) {

    let game = new Map();

    let i = 0;
    while (input[i] !== "Ave Cesar"){
        if (input[i].indexOf(" -> ") > -1){
            let [gladiator, technique, skill ] = input[i].split(" -> ");

            if (!game.has(gladiator)){
                game.set(gladiator, new Map());
            }

            if (!game.get(gladiator).has(technique)){
                game.get(gladiator).set(technique, 0);
            }

            if (game.get(gladiator).get(technique) < +skill){
                game.get(gladiator).set(technique, +skill);
            }

        }else if (input[i].indexOf(" vs ") > -1) {
            let [firstFighter, secondFighter] = input[i].split(" vs ");
            if (game.has(firstFighter) && game.has(secondFighter)){
                let commonTechnique = 0;
                game.get(firstFighter).forEach((v,k) => {

                    if (game.get(secondFighter).has(k)){
                        commonTechnique++;
                    }
                })

                if (commonTechnique > 0){
                    let firstFighterSkill = 0;
                    for (let [k,v] of game.get(firstFighter)){
                        firstFighterSkill += +v;
                    }
                    let secondFighterSkill = 0;
                    for (let [k,v] of game.get(secondFighter)){
                        secondFighterSkill += +v;
                    }
                    if (firstFighterSkill < secondFighterSkill) {
                        game.delete(firstFighter);
                    }else if (secondFighterSkill < firstFighterSkill){
                        game.delete(secondFighter);
                    }
                }
            }
        }
        
        i++;
        
    }
    [...game.keys()]
        .sort((a,b)=>{
       return ([...game.get(b).values()].reduce((acc, cur)=>{return acc += +cur; }) - ([...game.get(a).values()].reduce((acc, cur)=>{return acc += +cur; }))
       || a.localeCompare(b))
    }).forEach(x=>{
        console.log(`${x}: ${[...game.get(x).values()].reduce((acc, cur)=>acc += +cur)} skill`);
        [...game.get(x).keys()]
            .sort((a,b)=>{
            return game.get(x).get(b) - game.get(x).get(a) || a.localeCompare(b);
        }).forEach( y => console.log(`- ${y} <!> ${game.get(x).get(y)}`))
    })

}

main(['oesho -> Duck -> 400',
    'Posho -> Duck -> 400',
    'Julius -> Shield -> 150',
    'Gladius -> Heal -> 200',
    'Gladius -> Support -> 250',
    'Gladius -> Shield -> 250',
    'Pesho vs Gladius',
    'Gladius vs Julius',
    'Gladius vs Gosho',
    'Ave Cesar',]);