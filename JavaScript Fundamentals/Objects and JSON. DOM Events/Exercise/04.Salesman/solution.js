function solve() {
  let textAreas = document.querySelectorAll("textarea");

  let log = textAreas[2];

  let products = [];
  let profit = 0;

  let buttons = document.querySelectorAll("button");

  let loadBtn = buttons[0];
  loadBtn.addEventListener("click", function() {
    let inputProducts = JSON.parse(textAreas[0].value);
    
    Array.from(inputProducts).forEach((p) => {
      let productExists = Array.from(products).some((pr) => {
        let productName = pr["name"];
        if(productName === p["name"]){
          return true;
        }
        return false;
      });
      
      if(productExists === false){
        products.push(p);
      } else {
        products = Array.from(products).map(e => {
          if(e["name"] === p["name"]){
            return p;
          }
          return e;
        });
      }
    });

    Array.from(products).forEach((p) => {
      log.value += "Successfully added " + p["quantity"].toString() + " " + p["name"].toString() + ". Price: " + p["price"].toString() + "\n";
    });
  });

  let buyBtn = buttons[1];
  buyBtn.addEventListener("click", function() {
    let requestedProduct = JSON.parse(textAreas[1].value);

      let isProductInStock = Array.from(products).some((pr) => {
        if(requestedProduct["name"] === pr["name"] && parseInt(pr["quantity"]) >= parseInt(requestedProduct["quantity"])){
          return true;
        }
        return false;
      });

      if(isProductInStock === true){
        Array.from(products).forEach((pr) => {
          if(pr["name"] === requestedProduct["name"]){
            let totalPrice = parseFloat(pr["price"]) * parseFloat(requestedProduct["quantity"]);
            profit += parseFloat(totalPrice);
            pr["quantity"] -= parseInt(requestedProduct["quantity"]);

            log.value += requestedProduct["quantity"].toString() + " " + requestedProduct["name"] + " sold for " + totalPrice.toString() + ".\n";

          }
        });

      } else {
        log.value += "Cannot complete order.\n";
      }
      
  });

  let endBtn = buttons[2];
  endBtn.addEventListener("click", function() {
    log.value += "Profit: " + profit.toFixed(2).toString() + ".\n";

    loadBtn.disabled = true;
    buyBtn.disabled = true;
    endBtn.disabled = true;
  });
}