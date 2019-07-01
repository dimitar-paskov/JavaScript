function solve() {
    let summary = {};
    for(arg of arguments){
        let type = typeof arg;
        console.log(type +": " + arg );
        if (!summary[type]){
            summary[type] = 0;
        }

        summary[type]++;

    }

    Object.keys(summary)
        .sort((a,b)=> {return (summary[b] - summary[a])})
        .forEach(x=>{
            console.log(`${x} = ${summary[x]}`);
        })
}

solve(42, 15, 'cat');