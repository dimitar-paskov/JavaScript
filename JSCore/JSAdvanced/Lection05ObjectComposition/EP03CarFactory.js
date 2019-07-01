let requestedCar = { model: 'VW Golf II',
    power: 90,
    color: 'blue',
    carriage: 'hatchback',
    wheelsize: 14 }

let myCar = (()=>{
    let smallEngine = {power: 90, volume: 1800};
    let normalEngine = {power: 120, volume: 2400};
    let monsterEngine = {power: 200, volume: 3500};

    let hatchback = {type: 'hatchback', color: ''};
    let coupe = {type: 'coupe', color: ''};



    function solve(Car) {
        let model = 'model';
        let power = 'power';
        let engine = 'engine';
        let carriage = 'carriage';
        let color = 'color';
        let wheelsize = 'wheelsize';
        let wheels = 'wheels';

        let smallEngine = {power: 90, volume: 1800};
        let normalEngine = {power: 120, volume: 2400};
        let monsterEngine = {power: 200, volume: 3500};

        let hatchback = {type: 'hatchback', color: ''};
        let coupe = {type: 'coupe', color: ''};

        let resultCar = {};
        resultCar[model] = Car[model];
        
        if (Car[power] <= 90){
            resultCar[engine] = smallEngine;
        }else if (Car[power] <= 120){
            resultCar[engine] = normalEngine;
        } else{
            resultCar[engine] = monsterEngine;
        }
        
        if (Car[carriage] ==='hatchback') {
            resultCar[carriage] = hatchback;
        }else if (Car[carriage] === 'coupe') {
            resultCar[carriage] = coupe;
        }

        resultCar[carriage][color] = Car[color];

        if (Car[wheelsize] % 2 === 0){
            resultCar[wheels] = Array(4).fill(Car[wheelsize]-1);
        } else{
            resultCar[wheels] = Array(4).fill(Car[wheelsize]);
        }


        return resultCar;
    }

    return solve;
})();



console.log(myCar(requestedCar));