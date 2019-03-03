function makeReservation(selector){    
    function endFunction(){
        let wrapper = document.getElementById("wrapper");    
        wrapper.innerHTML = "";

        let finalHeader = document.createElement("h4");
        finalHeader.textContent = "Thank you for your reservation!";
        wrapper.appendChild(finalHeader);
    }

    let infoPreviewList = document.getElementById("infoPreview");
    let container = document.getElementById("container");

    let continueBtn = document.getElementById("continue");
    continueBtn.addEventListener("click", function(){
        let header = document.createElement("h2");
        header.textContent = "Payment details";

        let paymentOptions = document.createElement("select");
        paymentOptions.id = "paymentOptions";
        paymentOptions.classList.add("custom-select");

        let chooseOption = document.createElement("option");
        chooseOption.textContent = "Choose";
        chooseOption.selected = true;
        chooseOption.setAttribute("selected", "");
        chooseOption.disabled = true;
        chooseOption.setAttribute("disabled", "");        
        chooseOption.hidden = true;
        chooseOption.setAttribute("hidden", "");
        paymentOptions.appendChild(chooseOption);

        let creditCardOption = document.createElement("option");
        creditCardOption.value = "creditCard";
        creditCardOption.textContent = "Credit Card";
        paymentOptions.appendChild(creditCardOption);     

        let bankTransferOption = document.createElement("option");
        bankTransferOption.value = "bankTransfer";
        bankTransferOption.textContent = "Bank Transfer";
        paymentOptions.appendChild(bankTransferOption);       

        let extraDetailsDiv = document.createElement("div");
        extraDetailsDiv.id = "extraDetails";
        
        container.appendChild(header);
        container.appendChild(paymentOptions);
        container.appendChild(extraDetailsDiv);

        document.getElementById("paymentOptions").onchange = function(e) {
            let targetValue = e.target.value;
            
            let detailsDiv = document.getElementById("extraDetails");
            detailsDiv.innerHTML = "";
               
            if(targetValue === "creditCard"){
                let firstDiv = document.createElement("div");
                firstDiv.classList.add("inputLabel");
    
                firstDiv.innerHTML = "Card Number<input>";
                
                detailsDiv.appendChild(firstDiv);                                
                detailsDiv.innerHTML += "<br>";
    
                let secondDiv = document.createElement("div");
                secondDiv.classList.add("inputLabel");
                
                secondDiv.innerHTML = "Expiration Date<input>";
                
                detailsDiv.appendChild(secondDiv);                
                detailsDiv.innerHTML += "<br>";
    
                let thirdDiv = document.createElement("div");
                thirdDiv.classList.add("inputLabel");
    
                thirdDiv.innerHTML = "Security Numbers<input>";
    
                detailsDiv.appendChild(thirdDiv);                                
                detailsDiv.innerHTML += "<br>";
    
                let checkOutBtn = document.createElement("button");
                checkOutBtn.id = "checkOut";
                checkOutBtn.textContent = "Check Out";
                checkOutBtn.addEventListener("click", endFunction);
    
                detailsDiv.appendChild(checkOutBtn);
            } else if(targetValue === "bankTransfer"){
    
                let paragraph = document.createElement("p");
                paragraph.innerHTML = 
                "You have 48 hours to transfer the amount to:<br>IBAN: GR96 0810 0010 0000 0123 4567 890";
    
                detailsDiv.appendChild(paragraph);
    
                let checkOutBtn = document.createElement("button");
                checkOutBtn.id = "checkOut";
                checkOutBtn.textContent = "Check Out";
                checkOutBtn.addEventListener("click", endFunction);
                
                detailsDiv.appendChild(checkOutBtn);
            }
        };

        continueBtn.disabled = true;
        document.getElementById("edit").disabled = true;
        document.getElementById("submit").disabled = true;
    });

    let editBtn = document.getElementById("edit");
    editBtn.addEventListener("click", function(){
        let userInfo = Array.from(document.querySelectorAll("#infoPreview > li"));

        let name = userInfo[0].textContent.split(": ")[1];
        let email = userInfo[1].textContent.split(": ")[1];
        let phoneNumber = userInfo[2].textContent.split(": ")[1];
        let address = userInfo[3].textContent.split(": ")[1];
        let postalCode = userInfo[4].textContent.split(": ")[1];
        
        document.getElementById("infoPreview").innerHTML = "";

        document.getElementById("fullName").value = name;
        document.getElementById("email").value = email;
        document.getElementById("phoneNumber").value = phoneNumber;
        document.getElementById("address").value = address;
        document.getElementById("postalCode").value = postalCode;

        editBtn.disabled = true;
        continueBtn.disabled = true;
        document.getElementById("submit").disabled = false;
    });

    let submitBtn = document.getElementById("submit");
    submitBtn.addEventListener("click", function(e){
        let fullName = document.getElementById("fullName").value;
        let email = document.getElementById("email").value;
        let phoneNumber = document.getElementById("phoneNumber").value;
        let address = document.getElementById("address").value;
        let postalCode = document.getElementById("postalCode").value;

        if(fullName.length > 0 && email.length > 0){
            let fullNameListItem = document.createElement("li");
            fullNameListItem.textContent = "Name: " + fullName.toString();

            let emailListItem = document.createElement("li");
            emailListItem.textContent = "E-mail: " + email.toString();
            
            let phoneNumberListItem = document.createElement("li");
            phoneNumberListItem.textContent = "Phone: " + phoneNumber.toString();

            let addressListItem = document.createElement("li");
            addressListItem.textContent = "Address: " + address.toString();

            let postalCodeListItem = document.createElement("li");
            postalCodeListItem.textContent = "Postal Code: " + postalCode.toString();

            infoPreviewList.appendChild(fullNameListItem);
            infoPreviewList.appendChild(emailListItem);
            infoPreviewList.appendChild(phoneNumberListItem);
            infoPreviewList.appendChild(addressListItem);
            infoPreviewList.appendChild(postalCodeListItem);

            e.target.disabled = true;
            document.getElementById("fullName").value = "";
            document.getElementById("email").value = "";
            document.getElementById("phoneNumber").value = "";
            document.getElementById("address").value = "";
            document.getElementById("postalCode").value = "";

            continueBtn.disabled = false;
            editBtn.disabled = false;
        }
    });
}