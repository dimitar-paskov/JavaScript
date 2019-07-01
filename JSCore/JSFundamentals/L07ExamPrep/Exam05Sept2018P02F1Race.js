function solve(n) {

// ot nqkoj kolega - re6enie na 11 red
    // (n, arr) =>
    //     (arr = n.shift().split(' ')) &&
    //     n.forEach((a, b) =>
    //         (a = a.split(' '))[0] == 'Join' ?
    //             arr.includes(a[1]) ? 0 : arr.push(a[1])
    //             : a[0] == 'Crash' ?
    //             arr.includes(a[1]) ? arr.splice(arr.indexOf(a[1]), 1) : 0
    //             : a[0] == 'Pit' ?
    //                 (b = arr.indexOf(a[1])) > -1 && b + 1 != arr.length ? [arr[b], arr[b + 1]] = [arr[b + 1], arr[b]] : 0
    //                 : a[0] == 'Overtake' ?
    //                     (b = arr.indexOf(a[1])) > -1 && b - 1 != -1 ? [arr[b], arr[b - 1]] = [arr[b - 1], arr[b]] : 0
    //                     : 0)
    //     || arr.join(' ~ ');

}

solve(["Vetel Hamilton Slavi",
    "Pit Hamilton",
    "Overtake Vetel",
    "Crash Slavi"]);