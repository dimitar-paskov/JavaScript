function SortedList() {
    this.list = [];
    this.size = this.list.length;

    Object.getPrototypeOf(SortedList.prototype).add= function (el) {
        this.list.push(el);
        this.list.sort((a, b) => a - b);
        this.size = this.list.length;

    };

    Object.getPrototypeOf(SortedList.prototype).remove = function (index) {
        if (0 <= index && index < this.list.length) {
            this.list.splice(index, 1);
            this.size = this.list.length;
        }

    };
    Object.getPrototypeOf(SortedList.prototype).get = function (index) {
        if (0 <= index && index < this.list.length) {
            return this.list[index];
        }

    };
    Object.getPrototypeOf(SortedList.prototype).print = function () {
        console.log(this.list.join(" "));
    };

   // return this;
}

// class SortedList {
//     constructor() {
//         this.arr = []
//         this.size = 0
//     }
//
//     add(element) {
//         this.arr.push(element)
//         this.size += 1
//         return this.arr.sort((a, b) => {
//             return a - b
//         })
//     }
//
//     remove(index) {
//         if (this.arr.length > index && index >= 0) {
//             this.arr.splice(index, 1)
//             this.size--
//         } else {
//             throw new Error
//         }
//         return this.arr.sort((a, b) => {
//             return a - b
//         })
//     }
//
//     get(index) {
//         if (this.arr.length > index && index >= 0) {
//             return this.arr[index]
//         } else {
//             throw new Error
//         }
//     }
// }







myList = new SortedList();
myList.add(5);
myList.add(2);
myList.add(10);
myList.remove(1);
console.log(myList.get(1));
myList.add(14);
myList.add(117);
myList.add(-5);

myList1 = new SortedList();
myList1.add(5);
myList1.add(2);
myList1.add(10);

// myList.print();
// myList1.print();
console.log(myList);
console.log(myList1);
console.log(SortedList.prototype)