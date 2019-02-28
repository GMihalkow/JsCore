function acceptance() {
	let companyField = document.getElementsByName("shippingCompany")[0];
	let productName = document.getElementsByName("productName")[0];
	let productQuantity = document.getElementsByName("productQuantity")[0];
	let productScrape = document.getElementsByName("productScrape")[0];

	let warehouseDiv = document.getElementById("warehouse");

	if(companyField.value.length > 0 && productName.value.length > 0 && !isNaN(productQuantity.value) && !isNaN(productScrape.value)){
		let divElement = document.createElement("div");

		let actualQuantity = parseInt(productQuantity.value) - parseInt(productScrape.value);

		if(actualQuantity <= 0){
			 
		} else {
			let paragraph = document.createElement("p");
			paragraph.textContent = "[" + companyField.value.toString() + "] " + productName.value + " - " + actualQuantity.toString() + " pieces";
	
			let button = document.createElement("button");
			button.textContent = "Out of stock";
			button.addEventListener("click", function(e){
				let parent = e.target.parentElement;
				let rootElement = parent.parentElement;
	
				rootElement.removeChild(parent);
			});
	
			divElement.appendChild(paragraph);
			divElement.appendChild(button);
	
			warehouseDiv.appendChild(divElement);
		}
		
	}
	
	document.getElementsByName("shippingCompany")[0].value = "";
	document.getElementsByName("productName")[0].value = "";
	document.getElementsByName("productQuantity")[0].value = "";
	document.getElementsByName("productScrape")[0].value = "";
}