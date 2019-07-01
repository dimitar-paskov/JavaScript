function EP07PrintLines(arr) {

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "Stop") {
            return;
        }

        console.log(arr[i]);
    }
}

EP07PrintLines(["Line1", "Line2", "Line3","Stop"]);