function currencyFormatter(separator, symbol, symbolFirst, value) {
    let result = Math.trunc(value) + separator;
    result += value.toFixed(2).substr(-2,2);
    if (symbolFirst) return symbol + ' ' + result;
    else return result + ' ' + symbol;
}

function Hof(formatter) {


    function formatFunc2(value){
        let separator= ",";
        let symbol = "$";
        let symbolFirst = true;
        return formatter(separator, symbol, symbolFirst, value);
    };
    return formatFunc2;

}

let formatter = Hof(currencyFormatter);
formatter(5345);