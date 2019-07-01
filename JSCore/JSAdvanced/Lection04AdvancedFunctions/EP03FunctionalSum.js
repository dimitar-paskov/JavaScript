function add() {
    let sum = 0;

    function calc(num) {
        sum += num;
        return calc;
    }

    calc.toString = function() { return sum };
    return calc;
}

console.log(add(1)(6)(-4).toString());