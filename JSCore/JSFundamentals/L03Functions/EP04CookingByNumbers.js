function solve(arr) {
    let val = arr[0];
    for (let i = 1; i < arr.length; i++) {
        let operation = arr[i];
        switch (operation) {
            case 'chop' :
                val /= 2;
                break;
            case 'dice' :
                val = Math.sqrt(val);
                break;
            case 'spice':
                val += 1;
                break;
            case 'bake' :
                val *= 3;
                break;
            case 'fillet':
                val *= 0.8;
                break;
        }
        console.log(val);
    }
}
solve(['9', 'dice', 'spice', 'chop', 'bake', 'fillet']);