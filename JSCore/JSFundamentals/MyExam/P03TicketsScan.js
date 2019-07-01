function solve(data, info) {

    let patternName = / ([A-Z]([a-zA-Z])*)-(([A-Z][a-zA-Z]*\.-)*)([A-Z][a-zA-Z]*) /g;
    let patternAirport = / [A-Z]{3}\/[A-Z]{3} /g;
    let patternFlight = / [A-Z]{1,3}\d{1,5} /g;
    let patternCompany = /- [A-Z][A-Za-z]*\*[A-Z][A-Za-z]* /g;

    let matchNames = data.match(patternName);
    let matchAirport = data.match(patternAirport);
    let matchFlight = data.match(patternFlight);
    let matchCompany = data.match(patternCompany);

    // console.log(matchNames);
    // console.log(matchAirport);
    // console.log(matchFlight);
    // console.log(matchCompany);

    if (matchNames && matchAirport && matchFlight && matchCompany){
        let tokens = matchNames[0].split("-");
        let j = 0;
        let firstName = tokens[j++].trim();
        let secondName = '';
        if (tokens.length === 3){
            secondName = tokens[j++].trim();
        }
        let familyName = tokens[j++].trim();

        let name = firstName;
        if (secondName){ name += " " + secondName};
        name += " " + familyName;


        let flightNumber = matchFlight[0].trim();
        tokens = matchAirport[0].trim().split("/")
        let fromAirport = tokens[0];
        let toAirport = tokens[1];


        let companyName = matchCompany[0].replace("-", " ").trim().replace("*", " ");



        if (info === "name"){
            console.log(`Mr/Ms, ${name}, have a nice flight!`)
        } else if (info === "flight"){
            console.log(`Your flight number ${flightNumber} is from ${fromAirport} to ${toAirport}.`)
        } else if (info === "company"){
            console.log(`Have a nice flight with ${companyName}.`)
        } else if ((info === "all")){
            console.log(`Mr/Ms, ${name}, your flight number ${flightNumber} is from ${fromAirport} to ${toAirport}. Have a nice flight with ${companyName}.`)
        }

    }


}

solve('ahah Second-Testov )*))&&ba SOF/VAR  First-Testov. ela** FB973 - Bulgaria*Air -opFB900 pa-SOF/VAr//_- T12G12 STD08:45  STA09:35 ', 'all');
solve(' TEST-T.-TESTOV   SOF/VIE OS806 - Austrian*Airlines T24G55 STD11:15 STA11:50 ', 'flight');