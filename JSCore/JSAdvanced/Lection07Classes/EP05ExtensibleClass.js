let Extensible = (()=>{
        let currentId = 0
        function ExtensibleClass() {
            this.id = currentId++;

        }
        ExtensibleClass.prototype.extend = function (obj) {

            Object.keys(obj).forEach(x => {
                if (typeof obj[x] !== "function") {
                    this[x] = obj[x];
                } else {
                    ExtensibleClass.prototype[x] = obj[x];
                }
            })


        }

        return ExtensibleClass;

    })();

let template = {
    name:"Pesho",
    grow:()=>{console.log("hello")}
}

let obj1 = new Extensible();
let obj2 = new Extensible();
let obj3 = new Extensible();

obj1.extend(template);

console.log(obj1);
obj1.grow();
console.log(obj2.id);
console.log(obj3.id);