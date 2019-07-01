function solve () {
    let myObj = {
        extend: function (obj) {

            Object.keys(obj).forEach(x => {
                if (typeof obj[x] !== "function") {
                    this[x] = obj[x];
                } else {
                    this.__proto__[x] = obj[x];
                }
            })


        }
    }
    return myObj;
}

let otherObj = {
    name: "az",
    age: 18,
    grow: ()=>{console.log("Say hello")}
}

myObj.extend(otherObj);
console.log(myObj);