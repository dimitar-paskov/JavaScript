function main(input) {

    let register = new Map();

    for (let i = 0; i < input.length; i++){
        let [systemName, componentName, subcomponentName] = input[i].split(" | ");

        if (!register.has(systemName)){
            register.set(systemName, new Map());
        }

        if (!register.get(systemName).has(componentName)){
            register.get(systemName).set(componentName, new Set());
        }

        register.get(systemName).get(componentName).add(subcomponentName);




    }

    Array.from(register.keys())
        .sort((x,y) => register.get(y).size - register.get(x).size || x.toLowerCase().localeCompare(y.toLowerCase()))
        .forEach( x => {
            console.log(x);
            Array.from(register.get(x).keys())
                .sort((a,b) => register.get(x).get(b).size - register.get(x).get(a).size)
                .forEach( (item) =>{
                    console.log(`|||${item}`);
                    Array.from(register.get(x).get(item))
                        .forEach(s=> console.log(`||||||${s}`))

                })

        })

}

main(['SULS | Main Site | Home Page',
    'SULS | Main Site | Login Page',
    'SULS | Main Site | Register Page',
    'SULS | Judge Site | Login Page',
    'SULS | Judge Site | Submittion Page',
    'Lambda | CoreA | A23',
    'SULS | Digital Site | Login Page',
    'Lambda | CoreB | B24',
    'Lambda | CoreA | A24',
    'Lambda | CoreA | A25',
    'Lambda | CoreC | C4',
    'Indice | Session | Default Storage',
    'Indice | Session | Default Security'])