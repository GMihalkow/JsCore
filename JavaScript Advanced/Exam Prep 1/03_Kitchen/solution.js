class Kitchen{
    constructor(budget){
        this.budget = budget;
        this.productsInStock = [];
        this.menu = {};
        this.actionsHistory = [];
    }

    loadProducts(products){
        let resultText = "";

        Array.from(products).forEach((line) => {
           let splitLine = line.split(" ");

           let productName = splitLine[0];
           let productQuantity = parseFloat(splitLine[1]);
           let productPrice = parseFloat(splitLine[2]); 

           let newProduct = { name: productName, quantity: productQuantity, price: productPrice };
           
            let result = this.budget - productPrice;
            if(result >= 0 && productPrice >= 0){
                    if(Array.from(this.productsInStock).some((pr) => pr.name === productName)){
                        Array.from(this.productsInStock).find((pr) => pr.name === productName).quantity += productQuantity;
                    } else {
                        this.productsInStock.push(newProduct);
                    }

                    this.budget -= productPrice;
                    this.actionsHistory.push("Successfully loaded " + productQuantity.toString() + " " + productName.toString());
                    resultText += ("Successfully loaded " + productQuantity.toString() + " " + productName.toString() + "\n");
            } else {
                    this.actionsHistory.push("There was not enough money to load " + productQuantity.toString() + " " + productName.toString());
                    resultText += ("There was not enough money to load " + productQuantity.toString() + " " + productName.toString() + "\n");
            }
        });
        resultText = resultText.trim();
        return resultText;
    }

    addToMenu(meal, neededProducts, price){
        if(Object.keys(this.menu).some((m) => this.menu[m] === meal)){
            // this.actionsHistory.push("The " + meal.toString() + " is already in the our menu, try something different.");
            return ("The " + meal.toString() + " is already in the our menu, try something different.");
        } else {
            let mealProducts = Array.from(neededProducts).map((el) => {
                let splitElement = el.split(" ");
                let tempProduct = { name: splitElement[0], quantity: parseFloat(splitElement[1]) };
                return tempProduct;
            });

            let newMeal = { name: meal, neededProducts: mealProducts, price: price };

            this.menu[meal] = newMeal;

            // this.actionsHistory.push("Great idea! Now with the " + meal.toString() + " we have " + this.menu.length.toString() + " meals in the menu, other ideas?");
            return ("Great idea! Now with the " + meal.toString() + " we have " + Object.keys(this.menu).length.toString() + " meals in the menu, other ideas?");
        }
    }

    showTheMenu(){
        let resultText = "";
        if(Object.keys(this.menu).length === 0){
            // this.actionsHistory.push("Our menu is not ready yet, please come later...");
            resultText = ("Our menu is not ready yet, please come later...");
        } else {
            Object.keys(this.menu).forEach((meal) => {
                // this.actionsHistory.push(meal.name.toString() + " - $ " + meal.price.toString());
                resultText += (this.menu[meal].name.toString() + " - $ " + this.menu[meal].price.toString() + "\n");
            });
        }
        
        resultText = resultText.trim();
        return resultText;
    }

    makeTheOrder(meal){
        let neededMeal = Object.keys(this.menu).find((m) => this.menu[m].name === meal);
        if(neededMeal !== undefined){
            let stockProducts = []; 
            Array.from(neededMeal.neededProducts).forEach((ndp) => {
                let stockProduct = this.productsInStock.find((pr) => pr.name === ndp.name);
                if(stockProduct !== undefined){
                    if(stockProduct.quantity >= ndp.quantity){
                        stockProducts.push(stockProduct);
                    }
                }
            });

            if(stockProducts.length === neededMeal.neededProducts.length){
                this.budget += neededMeal.price;
                // console.log(this.productsInStock);
                Array.from(neededMeal.neededProducts).forEach((pr) => {
                    Array.from(this.productsInStock).forEach((sp) => {
                        if(sp.name === pr.name){
                            sp.quantity -= parseFloat(pr.quantity);
                        }
                    });
                });
                // console.log(this.productsInStock);
                // console.log(this.productsInStock);
                this.productsInStock = Array.from(this.productsInStock).filter((pr) =>{
                    if(neededMeal.neededProducts.some((e) => e.name === pr.name)){
                        return false;
                    }
                    return true;
                });
                // console.log(this.productsInStock);

                // this.actionsHistory.push("Your order (" + meal.toString() + ") will be completed in the next 30 minutes and will cost you " + neededMeal.price.toString() + ".");
                return ("Your order (" + meal.toString() + ") will be completed in the next 30 minutes and will cost you " + neededMeal.price.toString() + ".");
            } else {
                // this.actionsHistory.push("For the time being, we cannot complete your order (" + meal.toString() + "), we are very sorry...");
                return ("For the time being, we cannot complete your order (" + meal.toString() + "), we are very sorry...");
            }
        } else {
            // this.actionsHistory.push("There is not " + meal.toString() + " yet in our menu, do you want to order something else?");
            return ("There is not " + meal.toString() + " yet in our menu, do you want to order something else?");
        }
    }
}

let testProducts = [
    'Banana 10 5', 
    'Banana 20 10', 
    'Strawberries 50 30', 
    'Yogurt 10 10', 
    'Yogurt 500 1500', 
    'Honey 5 50'];

let testMealName = "musaka"
let testNeededProducts = [ "kartofi 2", "kaima 1" ];
let testMealPrice = 20;

let dummyKitchen = new Kitchen(1000);
console.log(dummyKitchen.loadProducts(testProducts));
console.log(dummyKitchen.addToMenu('frozenYogurt', ['Yogurt 0.1', 'Honey 0.1', 'Banana 0.1', 'Strawberries 1'], 9.99));
console.log(dummyKitchen.addToMenu('Pizza', ['Flour 0.5', 'Oil 0.2', 'Yeast 0.5', 'Salt 0.1', 'Sugar 0.1', 'Tomato sauce 0.5', 'Pepperoni 1', 'Cheese 1.5'], 15.55));
console.log(dummyKitchen.showTheMenu());
console.log(dummyKitchen.makeTheOrder("pesho"));
