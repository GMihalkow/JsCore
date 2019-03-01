function realEstateAgency () {
	let agencyProfit = document.querySelector("#roof > h1");

	let buildingDiv = document.getElementById("building");

	let messageParagraph = document.getElementById("message");

	let buttons = document.getElementsByTagName("button");

	let rent = document.getElementsByName("apartmentRent")[0];
	let type = document.getElementsByName("apartmentType")[0];
	let comission = document.getElementsByName("agencyCommission")[0];
	let regBtn = buttons[0];
	regBtn.addEventListener("click", function(){
		if(isNaN(rent.value) || parseInt(rent.value) <= 0 || isNaN(comission.value) || parseInt(comission.value) < 0 || parseInt(comission.value) > 100 || type.value.length < 1 || type.value.includes(":")){
			messageParagraph.textContent = "Your offer registration went wrong, try again.";
		} else {
			let apartmentDiv = document.createElement("div");
			apartmentDiv.classList.add("apartment");

			let rentParagraph = document.createElement("p");
			rentParagraph.textContent = "Rent: " + rent.value.toString();
			let typeParagraph = document.createElement("p");
			typeParagraph.textContent = "Type: " + type.value.toString();
			let comissionParagraph = document.createElement("p");
			comissionParagraph.textContent = "Commission: " + comission.value.toString();

			apartmentDiv.appendChild(rentParagraph);
			apartmentDiv.appendChild(typeParagraph);
			apartmentDiv.appendChild(comissionParagraph);

			buildingDiv.appendChild(apartmentDiv);

			messageParagraph.textContent = "Your offer was created successfully.";
		}

		document.getElementsByName("apartmentRent")[0].value = "";
		document.getElementsByName("apartmentType")[0].value = "";
		document.getElementsByName("agencyCommission")[0].value = "";
	});

	let familyBudget = document.getElementsByName("familyBudget")[0];
	let familyApartmentType = document.getElementsByName("familyApartmentType")[0];
	let familyName = document.getElementsByName("familyName")[0];
	let findOfferBtn = buttons[1];
	findOfferBtn.addEventListener("click", function(){
		if(isNaN(familyBudget.value) || parseInt(familyBudget.value) <= 0 || familyApartmentType.value.length < 1 || familyName.value.length < 1){
			messageParagraph.textContent = "Your offer registration went wrong, try again.";
		} else {
			let apartments = document.getElementsByClassName("apartment");
			
			let validApartment = Array.from(apartments).find((ap) => {
				let room = Array.from(ap.children)[1];
				let roomName = room.textContent.substr(6,room.textContent.length);
			
				let rent = Array.from(ap.children)[0];
				let roomRent = parseFloat(rent.textContent.substr(6,rent.textContent.length));
			
				let comission = Array.from(ap.children)[2];
				let comissionValue = parseFloat(comission.textContent.split(": ")[1]);
			
				if(roomName === familyApartmentType.value && (roomRent + comissionValue) <= parseFloat(familyBudget.value)){
					return true;
				} else {
					return false;
				}
			});

			if(validApartment === undefined){
				messageParagraph.textContent = "We were unable to find you a home, so sorry :(";
			} else {
				let splitProfitInfo = parseFloat(agencyProfit.textContent.split(" ")[2]);
				let validApartmentRent = parseFloat(Array.from(validApartment.children)[0].textContent.split(": ")[1]);
				let comission = parseFloat(Array.from(validApartment.children)[2].textContent.split(": ")[1]);
				splitProfitInfo += validApartmentRent + comission;

				validApartment.innerHTML = "";
				let familyNameParagraph = document.createElement("p");
				familyNameParagraph.textContent = familyName.value;

				let descriptionParagraph = document.createElement("p");
				descriptionParagraph.textContent = "live here now";
				
				let moveOutBtn = document.createElement("button");
				moveOutBtn.textContent = "MoveOut";
				moveOutBtn.addEventListener("click", function(e){
					let target = e.target;
					let parent = target.parentElement;

					let name = Array.from(parent.children)[0].textContent;

					let rootElement = parent.parentElement;
					
					rootElement.removeChild(parent);
					
					messageParagraph.textContent = "They had found cockroaches in " + name.toString() + "'s apartment";
				});

				validApartment.appendChild(familyNameParagraph);
				validApartment.appendChild(descriptionParagraph);
				validApartment.appendChild(moveOutBtn);

				agencyProfit.textContent = "Agency profit: " + splitProfitInfo.toString() + " lv.";
				

				messageParagraph.textContent = "Enjoy your new home! :))";
			}
		}

		document.getElementsByName("familyBudget")[0].value = "";
		document.getElementsByName("familyApartmentType")[0].value = "";
		document.getElementsByName("familyName")[0].value = "";
	});
}