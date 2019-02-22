function solve(){
    let resultObj = {
        extend: function(obj){
            let objProps = Object.keys(obj);
            let thisPrototype = Object.getPrototypeOf(this);
            Array.from(objProps).forEach((key) => {
                let propValue = obj[key];
                if(typeof(propValue) === "function"){
                    thisPrototype[key] = propValue;
                } else {
                    this[key] = propValue;
                }
            });
        }
    }
    return resultObj;
}