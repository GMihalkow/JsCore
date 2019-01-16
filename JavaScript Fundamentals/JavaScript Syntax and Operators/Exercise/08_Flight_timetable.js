function FlightTimetable(inputArr){
    let arrivalOrDeparture = inputArr[0];
    let townName = inputArr[1];
    let time = inputArr[2];
    let flightNumber = inputArr[3];
    let gateNumber = inputArr[4];

    let result = `${arrivalOrDeparture}: Destination - ${townName}, Flight - ${flightNumber}, Time - ${time}, Gate - ${gateNumber}`;

    return result;
}

console.log(FlightTimetable([`Departures`, `London`, `22:45`, `BR117`, `42`]))