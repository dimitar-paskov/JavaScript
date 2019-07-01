let revModule = (function someFunc() {
    let counter = 0; // private
    function increase(num) { counter += num; console.log(someFunc.toString()); }
    function decrease(num) { counter -= num; }
    function decrease2(num) { counter -= num; }
    function value() { return counter; }
    return { increase, decrease, value }; // public
})();

revModule.increase(5);
console.log(revModule.value());

let n = Number(' '.trim());
console.log(n);