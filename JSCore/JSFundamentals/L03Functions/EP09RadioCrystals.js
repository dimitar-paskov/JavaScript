function solve(arr) {
    let target = arr[0];
    for (let i = 1; i < arr.length; i++){
        let ore = arr[i];
        console.log(`Processing chunk ${ore} microns`);

        if (isReady(ore)){
            continue;
        }

        ore = cut(ore);
        if (isReady(ore)){
            continue;
        }

        ore = lap(ore);
        if (isReady(ore)){
            continue;
        }
        ore = grind(ore);
        if (isReady(ore)){
            continue;
        }
        ore = etch(ore);
        if (isReady(ore)){
            continue;
        }
        ore = xray(ore);
        if (isReady(ore)){
            continue;
        }
        console.log(ore);

    }



    function cut(ore) {
        let countOfCuts = 0;
        while (true){
            if (ore / 4 >= target){
                ore /= 4;
                countOfCuts++;
            }else if (countOfCuts > 0){
                console.log(`Cut x${countOfCuts}`);
                ore = transportingAndWashing(ore);
                break;
            }else{
                break;
            }
        }

        return ore;
    }


    function lap(ore) {
        let countOfLaps = 0;
        while (true){
            if (ore * 0.8 >= target){
                ore *= 0.8;
                countOfLaps++;
            } else if (countOfLaps > 0){
                console.log(`Lap x${countOfLaps}`);
                ore = transportingAndWashing(ore);
                break;
            }else{
                break;
            }
        }

        return ore;
    }


    function grind(ore) {
        let countOfGrinds = 0;
        while (true){
            if (ore - 20 >= target){
                ore -= 20;
                countOfGrinds++;
            }else if ( countOfGrinds > 0){
                console.log(`Grind x${countOfGrinds}`);
                ore = transportingAndWashing(ore);
                break;
            }else{
                break;
            }
        }

        return ore;
    }

    function etch(ore) {
        let countOfEtches = 0;
        while (true){
            if (ore - 2 > target-2){
                ore -= 2;
                countOfEtches++;
            }else if (countOfEtches > 0) {
                console.log(`Etch x${countOfEtches}`);
                ore = transportingAndWashing(ore);
                break;
            }else{
                break;
            }
        }

        return ore;
    }

    function xray(ore) {
        ore +=1;
        console.log(`X-ray x1`);
        return ore;
    }



    function transportingAndWashing(ore) {
        ore = parseInt(ore);
        console.log("Transporting and washing");
        return ore;
    }

    function isReady(ore) {
        if (ore === target){
            console.log(`Finished crystal ${ore} microns`);
            return true;
        }
        return false;
    }

}

solve([1000, 4001, 8100]);