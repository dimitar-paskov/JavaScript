(function () {
    // let args = arguments;

    let solution = {
        add: function (){
            let vect1 = arguments[0];
            let vect2 = arguments[1];
            return [vect1[0] + vect2[0],vect1[1] + vect2[1] ];
        },
        multiply:function (){
            let vect1 = arguments[0];
            let scalar = arguments[1];
            return [vect1[0]*scalar, vect1[1]*scalar ];
        },
        length: function (){
            let vect1 = arguments[0];
            let length = Math.sqrt(Math.pow(vect1[0],2) + Math.pow(vect1[1],2));
            return length;
        },
        dot:  function (){
            let vect1 = arguments[0];
            let vect2 = arguments[1];
            return vect1[0] * vect2[0] + vect1[1] * vect2[1];
        },
        cross: function (){
            let vect1 = arguments[0];
            let vect2 = arguments[1];
            return vect1[0] * vect2[1] - vect1[1] * vect2[0];
        }
        ,

    }

    return solution;
    // solution.add([1, 1], [1, 0]);
    // solution.multiply([3.5, -2], 2);
    // solution.length([3, -4]);
    // solution.dotProduct([1, 0], [0, -1]);
    // solution.crossProduct([3, 7], [1, 0]);

})();

solve([1, 1], [1, 0]);

