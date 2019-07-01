(()=>{
    Array.prototype.last = function () {
        return this[this.length-1];
    }

    Array.prototype.skip = function (n) {
        let result = this.filter((x,idx)=>{
            return (idx >= n);
        })

        return result;
    }

    Array.prototype.take = function (n) {
        let result = this.filter((x,idx)=>{
            return (idx <= n-1);
        })

        return result;
    }

    Array.prototype.sum = function () {
        let result = this.reduce((acc, curr)=> acc+curr );


        return result;
    }

    Array.prototype.average = function () {
        let result = this.sum();
        result /= this.length;
        return result;
    }

})();

myArr = [1,2,3,4,5,6,7,8,9];
console.log(myArr.last());
console.log(myArr.skip(2));
console.log(myArr.take(2));
console.log(myArr.sum());
console.log(myArr.average());