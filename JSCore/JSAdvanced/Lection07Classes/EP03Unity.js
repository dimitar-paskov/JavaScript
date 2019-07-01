function Rat(name) {
    this.name = name;
    this.unitedRats = [];
    Rat.prototype.unite = function (rat) {
        if (rat instanceof Rat){
            this.unitedRats.push(rat);
        }
    };

    Rat.prototype.toString = function () {
        let answer = this.name+"\n";
        this.unitedRats.forEach(x=>{
            answer += ("##" + x.name + "\n");
        });
        return answer;
    };
    Rat.prototype.getRats = function () {
        return this.unitedRats;
    };
}



let test = new Rat("Pesho");
console.log(test.toString());
console.log(test.getRats());

test.unite(new Rat("Gosho"));
test.unite("fake rat");

console.log(test.toString());
console.log(test.getRats());


