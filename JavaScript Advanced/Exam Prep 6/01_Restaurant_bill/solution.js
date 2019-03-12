function addProduct(){
    let inputFields = document.querySelectorAll("#add-product input");   
    let productName = inputFields[0].value;
    let productPrice = inputFields[1].value;

    if(productName.length > 0 && productPrice.length > 0){
        let productList = document.querySelector("#product-list");
        let row = document.createElement("tr");

        let nameTd = document.createElement("td");
        nameTd.textContent = productName;

        let priceTd = document.createElement("td");
        priceTd.textContent = productPrice;

        row.appendChild(nameTd);
        row.appendChild(priceTd);

        productList.appendChild(row);
        
        let totalPriceElement = document.querySelector("tfoot tr").querySelectorAll("td")[1];

        let totalPrice = parseFloat(totalPriceElement.textContent);

        totalPriceElement.textContent = totalPrice + parseFloat(productPrice);

        inputFields[0].value = "";
        inputFields[1].value = "";
    }
}