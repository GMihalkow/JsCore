class Stringer{
    constructor(string, length){
        this.innerString = string;
        this.innerLength = length;
    }

    increase(length){
        let result = this.innerLength + length;
        
        if(result < 0){
            this.innerLength = 0;
        } else {
            this.innerLength += length;
        }
    }

    decrease(length){
        let result = this.innerLength - length;
        
        if(result < 0){
            this.innerLength = 0;
        } else {
            this.innerLength -= length;
        }
    }

    toString(){
        let result = this.innerString.substr(0, this.innerLength) + "...";

        return result;
    }
}

let stringer = new Stringer("TestTEST", 4);
stringer.increase(5);
console.log(stringer.toString());