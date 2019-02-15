function solve(arr, start, end){
    if(!Array.isArray(arr) || Array.from(arr).some((num) => isNaN(parseInt(num)))){
        return NaN;
    } else if(parseInt(start) < 0 || isNaN(parseInt(start))){
        start = 0;
    } else if(parseInt(start) < 0 || isNaN(parseInt(start)) || parseInt(start) > (arr.length - 1)){
        end = arr.length - 1;
    }

    let tempArr = arr.splice(start, end + 1);

    return Array.from(tempArr).reduce((a, b) => a + b, 0);
}

console.log(solve(
    'text', 0, 2
    ));