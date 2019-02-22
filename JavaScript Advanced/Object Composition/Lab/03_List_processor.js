function solve(inputArr){
    let textCollection = [];

    Array.from(inputArr).forEach((line) => {
        let splitLine = line.split(" ");
        let cmnd = splitLine[0];
        let string = splitLine[1];

        processCommand(cmnd, string);
    });

    function processCommand(command, text){
        if(command === "add"){
            textCollection.push(text);
        }

        if(command === "remove"){
            textCollection = Array.from(textCollection).map((el) => {
                if(el === text){
                    return undefined;
                }
                return el;
            }).filter(x => x);
        }

        if(command === "print"){
            console.log(textCollection.join(","));
        }
    }
}

solve(['add pesho', 'add gosho', 'add pesho', 'remove pesho','print']);