function solve(number) {
    while (getAvg(number) <= 5 ){
        number = number*10 + 9;
    }
console.log(number);


    function getAvg(number) {
        let str = number.toString();
        let avg = 0;
        for (let i = 0; i < str.length; i++){
            avg += +str[i];
        }
        return avg / str.length;
    }
}

solve(1)