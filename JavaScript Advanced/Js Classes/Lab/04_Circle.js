class Circle{
    constructor(radius){
        this.radius = radius;
        this.diameter;
        this.area;

        this._diameter;
    }

    get diameter(){
        return this.radius * 2;
    }

    set diameter(val){
        this.radius = val / 2;
        this._diameter = val;
    }

    get area(){
        return Math.PI * (this.radius ** 2);
    }
}

let circle = new Circle(2);
circle.diameter = 4;
console.log(circle.area);
// 12.566370614359172