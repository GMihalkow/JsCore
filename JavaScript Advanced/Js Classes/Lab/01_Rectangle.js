class Rectangle {
    constructor(width, height, color){
        this.width = width;
        this.height = height;
        this.color = color;
    }

    calcArea(){
        let area = this.width * this.height;

        return area;
    }
}

let rectangle = new Rectangle(2, 3, "red");
