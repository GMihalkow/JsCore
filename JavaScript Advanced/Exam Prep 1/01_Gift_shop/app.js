function solution() {
	let resultSection = document.getElementById("christmasGiftShop");

	let toyTypeField = document.getElementById("toyType");
	let toyPriceField = document.getElementById("toyPrice");
	let toyDescriptionField = document.getElementById("toyDescription");

	if(toyPriceField.value.toString().length === 0 || isNaN(toyPriceField.value) || toyDescriptionField.value.toString().length === 0){
		
	} else {
		let divWrapper = document.createElement("div");
		divWrapper.classList.add("gift");

		let img = document.createElement("img");
		img.src = "gift.png";
		
		let header = document.createElement("h2");
		header.textContent = toyTypeField.value;

		let paragraph = document.createElement("p");
		paragraph.textContent = toyDescriptionField.value;

		let btn = document.createElement("button");
		btn.textContent = "Buy it for $" + toyPriceField.value.toString();
		btn.onclick = function(e){
			let target = e.target;
			let parent = target.parentElement;
			let root = parent.parentElement;

			root.removeChild(parent);
		};

		divWrapper.appendChild(img);
		divWrapper.appendChild(header);
		divWrapper.appendChild(paragraph);
		divWrapper.appendChild(btn);

		resultSection.appendChild(divWrapper);
	}	
	
	document.getElementById("toyType").value = "";
	document.getElementById("toyPrice").value = "";
	document.getElementById("toyDescription").value = "";
}