function solve(arr) {
    let totalAmountMoney = 0;
    let firstBitcoinDay = 0;
    let bitcoins = 0;

    for (let i = 0; i < arr.length; i++) {
        let amountForTheDay = 0;
        if (i % 3 == 2) {
            amountForTheDay = +((+arr[i]) * 0.7 * 67.51);
        } else {
            amountForTheDay = +((+arr[i]) * 67.51);
        }
        totalAmountMoney += amountForTheDay;

        if (totalAmountMoney >= 11949.16) {

            if (firstBitcoinDay === 0) {
                firstBitcoinDay = i + 1;
            }

            if (totalAmountMoney / 11949.16 >= 1) {
                let newBitcoins = Math.floor(totalAmountMoney / 11949.16);
                totalAmountMoney -= newBitcoins * 11949.16;
                bitcoins += newBitcoins;

            }
        }
    }

    console.log(`Bought bitcoins: ${bitcoins}`)
    if (firstBitcoinDay !== 0) {
        console.log(`Day of the first purchased bitcoin: ${firstBitcoinDay}`)
    }
    console.log(`Left money: ${totalAmountMoney.toFixed(2)} lv.`);

}

solve([3124.15,
    504.212,
    2511.124])