function solve(input) {
    let atm = {};
    for (let i = 0; i < input.length; i++) {
        let command = input[i];

        if (command.length === 1) {
            let banknote = command[0];
            let banknoteCount = atm[banknote];
            if (banknoteCount){
                console.log(`Service Report: Banknotes from ${banknote}$: ${banknoteCount}.`)
            }else{
                console.log(`Service Report: Banknotes from ${banknote}$: 0.`)
            }

        } else if (command.length === 2) {
            let accountBalance = command[0];
            let moneyToWithdraw = command[1];

            if (accountBalance < moneyToWithdraw) {
                console.log(`Not enough money in your account. Account balance: ${accountBalance}$.`)
            } else if (moneyToWithdraw > getTotalCashInATM()) {
                console.log('ATM machine is out of order!');
            } else {
                let currentSum = moneyToWithdraw;

                let banknotesAvailable = Object.keys(atm).map(Number).sort((a, b) => b - a);
                // console.log(banknotesAvailable);
                let sum = 0;
                for (let j = 0; j < banknotesAvailable.length;) {
                    if (currentSum - banknotesAvailable[j] >= 0) {
                        if (atm[banknotesAvailable[j]] > 0) {
                            sum += banknotesAvailable[j];
                            currentSum -= banknotesAvailable[j];
                            atm[banknotesAvailable[j]]--;
                        } else {
                            j++;
                        }
                    } else {
                        j++;
                    }
                }




                accountBalance -= moneyToWithdraw;

                console.log(`You get ${moneyToWithdraw}$. Account balance: ${accountBalance}$. Thank you!`)
            }

        } else if (command.length > 2) {
            let insertedCash = 0;
            command.forEach(x => {
                if (!atm[x]) {
                    atm[x] = 0;
                }
                atm[x]++;
                insertedCash += x;
            })
            // console.log(atm);

            console.log(`Service Report: ${insertedCash}$ inserted. Current balance: ${getTotalCashInATM()}$.`)
        }

    }


    function getTotalCashInATM() {

        let totalCashInATM = Object.keys(atm).reduce((acc, cur) => {
            return acc += +cur * +atm[cur];
        }, 0)

        return totalCashInATM;
    }

}

solve([[20, 5, 100, 20, 1],
    [457, 141],
    [1],
    [10, 10, 5, 20, 50, 20, 10, 5, 2, 100, 20],
    [20, 85],
    [5000, 4500],
])