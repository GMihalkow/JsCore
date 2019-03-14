class PaymentManager{
    constructor(title){
        this.title = title;
    }

    render(id){
        let element = document.getElementById(id);

        // Creating the Table Element
        let table = document.createElement("table");

        // Creating the Caption Element
        let caption = document.createElement("caption");
        caption.textContent = this.title.toString() + " Payment Manager";
        table.appendChild(caption);

        // Creating the thead Element
        let thead = document.createElement("thead");

        // Creating the table row for the thead Element
        let thr = document.createElement("tr");

        // Creating the th for the Name field
        let thName = document.createElement("th");
        thName.textContent = "Name";
        thName.classList.add("name");
        thr.appendChild(thName);

        // Creating the th for the Category field
        let thCategory = document.createElement("th");
        thCategory.textContent = "Category";
        thCategory.classList.add("category");
        thr.appendChild(thCategory);

        // Creating the th for the Price field        
        let thPrice = document.createElement("th");
        thPrice.textContent = "Price";
        thPrice.classList.add("price");
        thr.appendChild(thPrice);

        // Creating the th for the Actions button
        let thActions = document.createElement("th");
        thActions.textContent = "Actions";
        thr.appendChild(thActions);

        thead.appendChild(thr);

        table.appendChild(thead);
        
        // Creating the tbody element
        let tbody = document.createElement("tbody");
        tbody.classList.add("payments");
        table.appendChild(tbody);

        // Creating the tfoot element
        let tfoot = document.createElement("tfoot");
        tfoot.classList.add("input-data");

        // Creating the tfoot row element for the fields
        let tfr = document.createElement("tr");

        // Creating the name input field       
        let tdName = document.createElement("td");
        let nameInput = document.createElement("input");
        nameInput.name = "name";
        nameInput.type = "text";
        tdName.appendChild(nameInput);
        tfr.appendChild(tdName);

        // Creating the name category field
        let tdCategory = document.createElement("td");
        let categoryInput = document.createElement("input");
        categoryInput.name = "category";
        categoryInput.type = "text";
        tdCategory.appendChild(categoryInput);
        tfr.appendChild(tdCategory);

        // Creating the price input field
        let tdPrice = document.createElement("td");
        let priceInput = document.createElement("input");
        priceInput.name = "price";
        priceInput.type = "number";
        tdPrice.appendChild(priceInput);
        tfr.appendChild(tdPrice);

        // Creating the add button
        let tdAddBtn = document.createElement("td");
        let addBtn = document.createElement("button");
        addBtn.addEventListener("click", function(){
            if(nameInput.value.toString().length > 0 
            && categoryInput.value.toString().length > 0 
            && priceInput.value.toString().length > 0){
                
                let mainTr = document.createElement("tr");
                
                let paymentNameTd = document.createElement("td");
                paymentNameTd.textContent = nameInput.value;

                let paymentCategoryTd = document.createElement("td");
                paymentCategoryTd.textContent = categoryInput.value;
                
                let paymentPriceTd = document.createElement("td");
                paymentPriceTd.textContent = parseFloat(priceInput.value).toString();
                let deleteTd = document.createElement("td");

                let deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Delete";
                deleteBtn.addEventListener("click", function(e){
                    let target = e.target;

                    let currentchild = target.parentElement.parentElement;
                    let parent = target.parentElement.parentElement.parentElement;

                    parent.removeChild(currentchild);
                });

                deleteTd.appendChild(deleteBtn);

                mainTr.appendChild(paymentNameTd);
                mainTr.appendChild(paymentCategoryTd);
                mainTr.appendChild(paymentPriceTd);
                mainTr.appendChild(deleteTd);
                
                tbody.appendChild(mainTr);

            }
            
            nameInput.value = "";
            categoryInput.value = "";
            priceInput.value = "";
        });

        addBtn.textContent = "Add";
        tdAddBtn.appendChild(addBtn);
        tfr.appendChild(tdAddBtn);

        tfoot.appendChild(tfr);

        table.appendChild(tfoot);
        element.appendChild(table);
    }

    decimalsCount(value){
        if ((value % 1) != 0) 
            return value.toString().split(".")[1].length;  
        return 0;
    }
}