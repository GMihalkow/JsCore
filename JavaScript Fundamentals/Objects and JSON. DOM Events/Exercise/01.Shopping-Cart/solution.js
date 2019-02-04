function solve() {
    let btns = document.querySelectorAll("button");
    let boughtProducts = {};
    
    let textArea = document.querySelector("textarea");
    let totalSum = 0;
    
    let productBtns = Array.from(btns).slice(0);
    let buyBtn = productBtns.pop();

    Array.from(productBtns).forEach((btn, index) => {
        btn.addEventListener("click", function(){
            let parentDiv = btn.parentElement;
            let paragraphs = btn.parentElement.querySelectorAll("p");

            let foodName = paragraphs[0].textContent;
            let price = parseFloat(paragraphs[1].textContent.split(": ")[1]);

            boughtProducts[foodName] = true;

            totalSum += price;
            
            textArea.textContent += "Added " + foodName + " for " + price.toFixed(2).toString() + " to the cart.\n";
        });
    });

    buyBtn.addEventListener("click", function(){
        let remainingProducts = Object.keys(boughtProducts).map((key) => { return key; });
        
        textArea.textContent += "You bought " + remainingProducts.join(", ") + " for " + totalSum.toFixed(2).toString() + ".\n";
    });

}