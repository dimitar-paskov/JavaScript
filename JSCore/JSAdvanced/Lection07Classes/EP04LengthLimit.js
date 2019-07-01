function Stringer(innerString, innerLength) {
    this.innerString = innerString;
    this.innerLength = innerLength;


    Stringer.prototype.increase = function(length){
        this.innerLength += length;
    }
    Stringer.prototype.decrease = function(length){
        this.innerLength -= length;
        if (this.innerLength < 0){
            this.innerLength = 0;
        }
    }
    Stringer.prototype.toString = function(){
        if (this.innerString.length <= this.innerLength){
            return this.innerString;
        } else{
            return this.innerString.slice(0,this.innerLength)+"...";
        }
    }
}

let test  = new Stringer("Test", 5);
console.log(test.toString());

test.decrease(3);
console.log(test.toString());

test.decrease(5);
console.log(test.toString());

test.increase(1);
console.log(test.toString());