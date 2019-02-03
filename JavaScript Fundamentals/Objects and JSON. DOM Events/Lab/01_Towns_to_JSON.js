function solve(inputArr){
    inputArr.shift();

    let objs = [];
    Array.from(inputArr).forEach((el) => {
        let tempArr = el.split("|");
        tempArr = Array.from(tempArr).filter((element) => { return element.toString().length > 0; });
        
        let tempObj = {};
        
        Array.from(tempArr).forEach((word, index) =>{
            let tempWord = word.trim();

            if(+index === 0){
                tempObj.Town = tempWord;
            } else if(+index === 1){
                tempObj.Latitude = +tempWord;
            } else if(+index === 2){
                tempObj.Longitude = +tempWord;
            }
        });
        objs.push(tempObj);
    })
    
    console.log(JSON.stringify(objs));
}

solve(
['| Town | Latitude | Longitude |',
'| Sofia | 42.696552 | 23.32601 |',
'| Beijing | 39.913818 | 116.363625 |']
)