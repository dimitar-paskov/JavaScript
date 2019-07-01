(() => {
    String.prototype.ensureStart = function (str) {
        let result;
        if (!this.startsWith(str)) {
            result = str + this;
        } else {
            result = this.toString();
        }
        return result;
    }

    String.prototype.ensureEnd = function (str) {
        let result;
        if (!this.endsWith(str)) {
            result = this + str;
        } else {
            result = this.toString();
        }
        return result;
    }
    String.prototype.isEmpty = function () {
        let result;
 //       console.log(this);
        if (!this.toString()) {
            result = true;
        } else {
            result = false;
        }
        return result;
    }

    String.prototype.truncate = function (n) {
        let result = this.toString();
        if (n < 4) {
            result = '.'.repeat(n);
        } else if (this.length <= n) {
            result = this.toString();
        } else {
            let temp = this.toString();
            let idx = 1;
            while (temp.length > n && idx !== -1) {
                idx = temp.lastIndexOf(' ');
                if (idx === -1) {
                    temp = temp.slice(0, n - 3) + '...';
                } else {
                    temp = temp.slice(0, idx) + '...';
                }
            }
            result = temp;

        }
        return result;
    }

    String.format = function () {
        let args = Array.from(arguments);
        let str = args.shift();
        args.forEach((x,idx)=>{
            let placeholder = "\\{"+idx+"\\}";
            let re = new RegExp(placeholder, "g");
            str = str.replace(re, x);
        })


        let result = str;
        return result;
    }




})();

let str = 'the quick brown fox jumps over the lazy dog'
// console.log(str = str.ensureStart('my'));
// console.log(str = str.ensureStart('hello '));
// console.log(str = str.ensureEnd('newString'));
// console.log(str = str.ensureEnd('String'));
// console.log(str.isEmpty());
// console.log(str = str.truncate(6));
console.log(str = str.truncate(12));
// console.log(str = str.truncate(8));
// console.log(str = str.truncate(4));
// console.log(str = str.truncate(2));
// console.log(str = String.format('The {0} {1} fox',
//     'quick', 'brown'));
// console.log(str = String.format('jumps {0} {1}',
//     'dog'));