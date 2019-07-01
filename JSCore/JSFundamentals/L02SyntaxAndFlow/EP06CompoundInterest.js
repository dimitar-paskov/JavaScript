function solve(arr) {
    let PrincipalDeposit = arr[0];
    let interestRate = arr[1]/100;
    let compoundFrequency = 12/arr[2];
    let timespan = arr[3];

    let sum = PrincipalDeposit * Math.pow((1+ interestRate/compoundFrequency), compoundFrequency*timespan);
    console.log(sum.toFixed(2));


}

solve([100000, 5, 12, 25]);