function EP15TurnObjectIntoJSONString(arr) {
    let obj = {};
     for (let i = 0; i < arr.length; i++) {
         let tokens = arr[i].split(" -> ");
         let key = tokens[0];

         let value = tokens[1];
         if (!isNaN(value)){
             value = Number(value);
         }
         obj[key] = value;

     }

     console.log(JSON.stringify(obj));

}

EP15TurnObjectIntoJSONString(["name -> Angel",
    "surname -> Georgiev",
    "age -> 20",
    "grade -> 6.00",
    "date -> 23/05/1995",
    "town -> Sofia"]);