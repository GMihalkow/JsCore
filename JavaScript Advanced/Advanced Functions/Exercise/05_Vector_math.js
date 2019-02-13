(function solve(){
    let result = {
        add: function (vec1, vec2){
            let xA = parseFloat(vec1[0]);
            let xB = parseFloat(vec1[1]);
            let yA = parseFloat(vec2[0]);
            let yB = parseFloat(vec2[1]);
    
            let a = xA + yA;
            let b = xB + yB;
    
            let resultArr = [a, b];
    
            return resultArr;
        },
        multiply: function (vec, s){
            let xA = parseFloat(vec[0]);
            let yA = parseFloat(vec[1]);
    
            let a = xA * s;
            let b = yA * s;
    
            let resultArr = [a, b];
    
            return resultArr;
        },
        length:  function (vec){
            let xA = parseFloat(vec[0]);
            let xB = parseFloat(vec[1]);
    
            let result = Math.sqrt(Math.pow(xA, 2) + Math.pow(xB, 2));
    
            return result;
        },
        dot: function (vec1, vec2){
            let xA = parseInt(vec1[0]);
            let xB = parseInt(vec2[0]);
            
            let yA = parseInt(vec1[1]);
            let yB = parseInt(vec2[1]);
    
            let result = xA * xB + yA * yB;
    
            return result;
        },
        cross: function (vec1, vec2){
            let xA = parseFloat(vec1[0]);
            let xB = parseFloat(vec1[1]);
            
            let yA = parseFloat(vec2[0]);
            let yB = parseFloat(vec2[1]);
    
            let result = (xA * yB) - (yA * xB);
    
            return result;
        }    
    };

    return result;
})()