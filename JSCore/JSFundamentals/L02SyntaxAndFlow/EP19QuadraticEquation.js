function solve(a, b, c) {
    let discriminant  = Math.pow(b, 2) - (4 * a * c);
    if (discriminant > 0){
        let root1 = (-b - Math.sqrt(discriminant )) / (2 * a);
        let root2 = (-b + Math.sqrt(discriminant )) / (2 * a);

        console.log(Math.min(root1, root2));
        console.log(Math.max(root1, root2));
    }else if (discriminant === 0 ){
        let root = (-b / (2 * a));
        console.log(root);
    }else {
        console.log("No");
    }
}

solve(6, 11, -35);
solve(1, -12, 36);
solve(5, 2, 1);
