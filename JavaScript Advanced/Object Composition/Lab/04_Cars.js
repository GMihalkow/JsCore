function solve(inputArr){
    let objs = [];

    Array.from(inputArr).forEach((line) => {
        let splitLine = line.split(" ");
        let command = splitLine[0];
        let name = splitLine[1];
        
        if(command === "create" && splitLine[2] !== "inherit"){
            createObj(name);
        } else if(command === "create" && splitLine[2] === "inherit"){
            let parentName = splitLine[3];

            inherit(name, parentName);
        } else if(command === "set"){
            let key = splitLine[2];
            let value = splitLine[3];

            setProp(name, key, value);
        } else if(command === "print"){
            print(name);
        }
    })

    function createObj(name){
        let newObj = { name };

        objs.push(newObj);
        return newObj;
    }

    function getObj(name){
        let obj = Array.from(objs).find((o) => o.name === name);
        if(obj === undefined){
            return null;
        }

        return obj;
    }

    function inherit(name, parentName){
        let parent = getObj(parentName);
        let newObj = Object.create(parent);
        newObj.name = name;

        objs.push(newObj);
    }

    function hasObjPrototype(obj){
        if(obj.__proto__.name === undefined){
            return false;
        } else {
            return true;
        }
    }

    function setProp(name, key, value){
        let obj = getObj(name);
        obj[key] = value;
    }

    function print(name){
        let resultText = "";
        let obj = getObj(name);
        let objProps = Object.keys(obj).map((k) => {
            if(k !== "name"){
                return k.toString() + ":" + obj[k].toString();
            } 
        }).filter(x => x);

        let isValid = hasObjPrototype(obj);
        if(isValid){
            let parentObj = obj.__proto__;
            while(isValid !== false){
                let parentProps = Object.keys(parentObj).map((k) => {
                    if(k !== "name"){
                        return k.toString() + ":" + obj[k].toString();
                    } 
                }).filter(x => x);
                
                let startIndex = objProps.length - 1;
                if(objProps.length === 0){
                    startIndex = 0;
                } else if(objProps.length === 1){
                    startIndex = 1;
                }
                objProps.splice(startIndex, 0, parentProps);
                isValid = hasObjPrototype(parentObj);
                parentObj = parentObj.__proto__;
            }
        } 

        resultText = objProps.join(", ");
        
        
        console.log(resultText);
    }
}

solve(
    ['create c1',
'create c2 inherit c1',
'set c1 color red',
'set c2 model new',
'print c1',
'print c2']
)