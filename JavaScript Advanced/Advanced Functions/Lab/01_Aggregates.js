function solve(input){
    let sum = Array.from(input).reduce((sum, a) => sum += a, 0);
    console.log("Sum = " + sum.toString());

    let min = Math.min.apply(Math, input);
    console.log("Min = " + min.toString());
    
    let max = Math.max.apply(Math, input);
    console.log("Max = " + max.toString());

    let product = Array.from(input).reduce((sum, a) => sum * a, 1);
    console.log("Product = " + product.toString());

    let join = input.join("");
    console.log("Join = " + join);

}

solve(
    [5, -3, 20, 7, 0.5]
)