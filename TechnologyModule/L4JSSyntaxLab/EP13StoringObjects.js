function EP13StoringObjects(arr) {

    let objects = [];

    for (let i = 0; i < arr.length; i++) {
        let tokens = arr[i].split(" -> ");
        let name = tokens[0];
        let age = Number(tokens[1]);
        let grade = Number(tokens[2]);

        let obj = {"Name": name, "Age":age, "Grade":grade};
        objects.push(obj);



    }

    for (let student of objects) {
        console.log(`Name: ${student.Name}`);
        console.log(`Age: ${student.Age}`);
        console.log(`Grade: ${student.Grade.toFixed(2)}`);


    }





}


EP13StoringObjects(["Pesho -> 13 -> 6.00",
"Ivan -> 12 -> 5.57",
"Toni -> 13 -> 4.90"]);