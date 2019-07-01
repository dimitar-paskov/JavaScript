function solve(arr) {
    let speed = arr[0];
    let zone = arr[1];
    let limit = getLimit(zone);
    let infraction = getInfraction(speed, limit);
    if (infraction) {
        console.log(infraction);
    }


    function getLimit(zone) {
        switch (zone) {
            case 'motorway' :
                return 130;
            case 'interstate' :
                return 90;
            case 'city' :
                return 50;
            case 'residential' :
                return 20;
        }
    }

    function getInfraction(speed, limit) {
        let overspeed = speed - limit;
        if (overspeed <= 0) {
            return false;
        } else if (overspeed > 40) {
            return "reckless driving"
        } else if (overspeed > 20) {
            return "excessive speeding"
        } else if (overspeed > 0) {
            return "speeding";
        }

    }
}

solve(120, 'interstate');