function main(input) {
    let answer = input
        .sort((a, b) => {
            if (a.length > b.length){
                return 1;
            }else if (a.length < b.length){
                return -1;
            }else if (a.toLowerCase() > b.toLowerCase()){
                return 1;
            }  else if (a.toLowerCase() < b.toLowerCase()){
                return -1;
            } else {
                return 0;
            }
        });
    console.log(answer.join("\n"));
}

main(["test",
    "Deny",
    "omen",
    "Default",
    "Pily"])