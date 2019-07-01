let SortedList = (() => {
    let list = [];

    list.sortAsc = function () {
        this.sort((a, b) => a - b);
    }


    let result = {
        add: function (el) {
            list.push(el);
            list.sortAsc();
            this.size = list.length;

        },
        remove: function (index) {
            if (0 <= index && index < list.length) {
                list.splice(index, 1);
                this.size = list.length;
            }

        },
        get: function (index) {
            if (0 <= index && index < list.length) {
                return list[index];
            }

        },
        size: list.length,

        print: function () {
            console.log(list.join(" "));
        }
    }

    return result;
});
myList = new SortedList();
myList.add(5);
myList.add(2);
myList.add(10);
myList.remove(1);
console.log(myList.get(1));
myList.add(14);
myList.add(117);
myList.add(-5);

myList.print();
console.log(myList);