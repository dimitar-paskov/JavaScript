function solve(arr) {
    let artistName = arr[1];
    let trackName = arr[0];
    let duration = arr[2];
    console.log(`Now Playing: ${artistName} - ${trackName} [${duration}]`);
}

solve(['Number One', 'Nelly', '4:09']);