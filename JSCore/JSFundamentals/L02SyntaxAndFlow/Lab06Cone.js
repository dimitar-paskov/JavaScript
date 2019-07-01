function coneAreaAndVolume(radius, height) {
    let volume = (Math.PI * Math.pow(radius, 2) * height ) / 3;
    let slant = Math.sqrt( Math.pow(radius,2) + Math.pow(height, 2));
    let area = Math.PI * radius * slant + Math.PI*Math.pow(radius,2);

    console.log(`volume = ${volume}`);
    console.log(`area = ${area}`);

}

coneAreaAndVolume(3.3, 7.8);