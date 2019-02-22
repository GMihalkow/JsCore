(function solve(){
    Array.prototype.last = function(){
        return this[this.length - 1];
    }

    Array.prototype.sum = function(){
        let resultSum = Array.from(this).reduce((sum, a) => sum + a, 0);
        return resultSum;
    }

    Array.prototype.skip = function(n){
        let index = n;
        if(index === 0){
            index = 0;
        } else if(index === 1){
            index = 1;
        } else {
            index = n - 1;
        }
        let resultArr = Array.from(this).splice(index, this.length);
        return resultArr;
    }

    Array.prototype.take = function(n){
        let resultArr = Array.from(this).slice(0, n);
        return resultArr;
    }

    Array.prototype.average = function(){
        let resultSum = Array.from(this).reduce((sum, a) => sum += a, 0);
        let arrLength = Array.from(this).length;
        
        let average = resultSum / arrLength;

        return average;
    }
})()