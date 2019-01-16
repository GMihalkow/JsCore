function CalculateWalktTime(stepsCountFromHome, footprintLengthInMeters, speedInKmh){
    let speedInMetersPerSecond = Math.round((speedInKmh * 1000)) / 3600;
    let metersTravelled = Math.round(stepsCountFromHome * footprintLengthInMeters);

    let breaksInSeconds = Math.floor(metersTravelled / 500) * 60;

    let secondsTravelled = Math.round((metersTravelled / speedInMetersPerSecond) + breaksInSeconds);

    let date = new Date(null);
    date.setSeconds(secondsTravelled);

    var result = date.toISOString().substr(11, 8);

    return result;
}

console.log(CalculateWalktTime(2564, 0.70, 5.5));