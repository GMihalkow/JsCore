    function onlineShop(selector){    
        let form = `<div id="header">Online Shop Inventory</div>
        <div class="block">
            <label class="field">Product details:</label>
            <br>
            <input placeholder="Enter product" class="custom-select">
            <input class="input1" id="price" type="number" min="1" max="999999" value="1"><label class="text">BGN</label>
            <input class="input1" id="quantity" type="number" min="1" value="1"><label class="text">Qty.</label>
            <button id="submit" class="button" disabled>Submit</button>
            <br><br>
            <label class="field">Inventory:</label>
            <br>
            <ul class="display">
            </ul>
            <br>
            <label class="field">Capacity:</label><input id="capacity" readonly>
            <label class="field">(maximum capacity is 150 items.)</label>
            <br>
            <label class="field">Price:</label><input id="sum" readonly>
            <label class="field">BGN</label>
        </div>`;
        $(selector).html(form);

        let submitBtn = document.querySelector("#submit");

        document.querySelector("input.custom-select").onkeyup = function(e){
            let target = e.target;
            if(target.value.length > 0){
                submitBtn.disabled = false;
            } else {
                submitBtn.disabled = true;
            }
        };

        submitBtn.onclick = function(e){
            let name = document.querySelector("input.custom-select").value;
            let price = document.querySelector("#price").value;
            let quantity = document.querySelector("#quantity").value; 

            if(name.toString().length > 0 && price.toString().length > 0 && quantity.toString().length > 0){
                let listItem = document.createElement("li");
                listItem.textContent = "Product: " + name.toString() + " Price: " + price.toString() + " Quantity: " + quantity.toString();
                
                let displayList = document.getElementsByTagName("ul")[0];
                displayList.appendChild(listItem);

                let currentLoad = document.querySelector("#capacity").value;
                if(parseInt(currentLoad) >= 150 || parseInt(quantity) === 150){
                    let capacityField = document.querySelector("#capacity");
                    capacityField.classList.add("fullCapacity");
                    capacityField.value = "full";

                    let nameField = document.querySelector("input");
                    nameField.disabled = true;
                    
                    let priceField = document.querySelector("#price");
                    priceField.disabled = true;

                    let quantityField = document.querySelector("#quantity");
                    quantityField.disabled = true;
                } else {
                    let capacityField = document.querySelector("#capacity");
                    if(!capacityField.value){
                        capacityField.value = 0;
                    }
                    let currentCapacity = parseInt(capacityField.value);
                    let newCapacity = currentCapacity + parseInt(quantity);
                    capacityField.value = newCapacity;
                    
                    let totalPrice = 0;

                    Array.from(displayList.querySelectorAll("li")).forEach((ch) => {
                        let tempPrice = parseFloat(ch.textContent.split(" ")[3]);
                        totalPrice += tempPrice;
                    });

                    document.querySelector("#sum").value = totalPrice;
                }

                document.querySelector("input.custom-select").value = "";
                document.querySelector("#price").value = 1;
                document.querySelector("#quantity").value = 1;
    
                let target = e.target;
                target.disabled = true;
            }
        };
    }