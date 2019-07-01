function solve(n) {

    let limit = parseInt((n - 3) / 2);

    if (n===2){
        console.log("+++");
    } else{



    console.log("+" + "-".repeat(n-2) + "+" + "-".repeat(n-2) + "+");

    for (let i = 0; i < limit; i++){
        console.log("|" + " ".repeat(n-2) + "|" + " ".repeat(n-2) + "|");
    }

    console.log("+" + "-".repeat(n-2) + "+" + "-".repeat(n-2) + "+");

    for (let i = 0; i < limit; i++){
        console.log("|" + " ".repeat(n-2) + "|" + " ".repeat(n-2) + "|");
    }

    console.log("+" + "-".repeat(n-2) + "+" + "-".repeat(n-2) + "+");
    }
}

solve(2);