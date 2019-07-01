function EP04ProductOf3Numbers(arr) {
    let x= Number(arr[0]);
    let y= Number(arr[1]);
    let z= Number(arr[2]);

    let result;
    if (x == 0 || y == 0 || z == 0) {
        result = "Positive";
    }else{
        let countOfNegative = 0;
        if (x < 0) { countOfNegative++;}
        if (y < 0) { countOfNegative++;}
        if (z < 0) { countOfNegative++;}

        if (countOfNegative % 2 == 0) {
            result = "Positive";
        }else{
            result = "Negative";
        }

    }
    console.log(result);

}

EP04ProductOf3Numbers(["2","0","-1"]);