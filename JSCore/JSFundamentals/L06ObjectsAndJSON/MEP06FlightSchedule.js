function solve(input ) {

    let airport = {};

    let info = input[0];
    for (let i = 0; i < info.length; i++){
        let [ flight, destination] = info[i].split(" ");
        airport[flight] = {destination, status: 'Ready to fly'};

    }

    let updates = input[1];
    for (let i = 0; i < updates.length; i++){
        let [flight, status] = updates[i].split(" ");
        if (airport[flight]){
            airport[flight]["status"] = status;
        }
    }

    let status = input[2][0];
    Object.values(airport).filter(x=>x["status"] === status).forEach(x => {
        console.log(`{ Destination: '${x["destination"]}', Status: '${x["status"]}' }`)
    })

  //  console.log(airport);

}

solve([['WN269 Delaware',
    'FL2269 Oregon',
    'WN498 Las Vegas',
    'WN3145 Ohio',
    'WN612 Alabama',
    'WN4010 New York',
    'WN1173 California',
    'DL2120 Texas',
    'KL5744 Illinois',
    'WN678 Pennsylvania'],
    ['DL2120 Cancelled',
        'WN612 Cancelled',
        'WN1173 Cancelled',
        'SK430 Cancelled'],
    ['Cancelled']
])