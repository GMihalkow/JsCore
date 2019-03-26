function attachEvents(){
    //Create a catch
    let addBtn = $(".add");
    addBtn.on("click", function(){
        let angler = $("#addForm .angler").val();
        let weight = $("#addForm .weight").val();
        let species = $("#addForm .species").val();
        let location = $("#addForm .location").val();
        let bait = $("#addForm .bait").val();
        let captureTime = $("#addForm .captureTime").val();
        
        $.ajax({
            url: 'https://baas.kinvey.com/appdata/kid_B1K_U76PV/biggestCatches',
            type: 'POST',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic Secret");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            data:{ 
                "angler": angler,
                "weight": parseInt(weight),
                "species": species,
                "location": location,
                "bait": bait,
                "captureTime": parseInt(captureTime) }
        }).catch((error) => {
            console.log(error);
        }).then((data) => {
            $("#catches").append(
                "<div class='catch' data-id='" + data["_id"] + "'>" 
                +
                    "<label>Angler</label>"
                    +
                    "<input type='text' class='angler' value='" + data["angler"] + "'/>"
                    +
                    "<label>Weight</label>"
                    +
                    "<input type='number' class='weight' value='" + data["weight"] + "'/>"
                    +
                    "<label>Species</label>"
                    +
                    "<input type='text' class='species' value='" + data["species"] + "'/>"
                    +
                    "<label>Location</label>"
                    +
                    "<input type='text' class='location' value='" + data["location"] + "'/>"
                    +
                    "<label>Bait</label>"
                    +
                    "<input type='text' class='bait' value='" + data["bait"] + "'/>"
                    +
                    "<label>Capture Time</label>"
                    +
                    "<input type='number' class='captureTime' value='" + data["captureTime"] + "'/>"
                    +
                    "<button class='update'>Update</button>"
                    +
                    "<button class='delete'>Delete</button>"
                +
                "</div>")
        });
    });

    //List all catches
    let loadBtn = $(".load");
    loadBtn.on("click", function(){
        $.ajax({
            url: 'https://baas.kinvey.com/appdata/kid_B1K_U76PV/biggestCatches',
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Basic Secret');
            }
        }).then((fetchedCatches) => {
            let catchesDiv = $("#catches");
            catchesDiv.html("");

            //Listing all the catches
            Array.from(fetchedCatches).forEach((c) => {
                catchesDiv.append(
                    "<div class='catch' data-id='" + c["_id"] + "'>" 
                    +
                        "<label>Angler</label>"
                        +
                        "<input type='text' class='angler' value='" + c["angler"] + "'/>"
                        +
                        "<label>Weight</label>"
                        +
                        "<input type='number' class='weight' value='" + c["weight"] + "'/>"
                        +
                        "<label>Species</label>"
                        +
                        "<input type='text' class='species' value='" + c["species"] + "'/>"
                        +
                        "<label>Location</label>"
                        +
                        "<input type='text' class='location' value='" + c["location"] + "'/>"
                        +
                        "<label>Bait</label>"
                        +
                        "<input type='text' class='bait' value='" + c["bait"] + "'/>"
                        +
                        "<label>Capture Time</label>"
                        +
                        "<input type='number' class='captureTime' value='" + c["captureTime"] + "'/>"
                        +
                        "<button class='update'>Update</button>"
                        +
                        "<button class='delete'>Delete</button>"
                    +
                    "</div>")
            });

            //Delete a catch
            $("#catches .catch .delete").on("click", function(e){
                let catchId = $(e.target).parent().attr("data-id");
                
                //Deleting the catch from the db
                $.ajax({
                    url: 'https://baas.kinvey.com/appdata/kid_B1K_U76PV/biggestCatches/' + catchId,
                    type: 'DELETE',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', 'Basic Secret');
                    }
                })

                //Removing the element from the page
                let currentCatch = e.target.parentElement;
                let parent = currentCatch.parentElement;
                parent.removeChild(currentCatch);
            });

            //Update a catch
            $("#catches .catch .update").on("click", function(e){
                let catchParent = e.target.parentElement;

                let catchId = $(e.target).parent().attr("data-id");

                let angler = catchParent.querySelector(".angler").value;
                let weight = catchParent.querySelector(".weight").value;
                let species = catchParent.querySelector(".species").value;
                let location = catchParent.querySelector(".location").value;
                let bait = catchParent.querySelector(".bait").value;
                let captureTime = catchParent.querySelector(".captureTime").value;        

               $.ajax({
                    url: 'https://baas.kinvey.com/appdata/kid_B1K_U76PV/biggestCatches/' + catchId,
                    type: 'PUT',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', 'Basic Secret');
                    },
                    data:{ 
                        "angler": angler,
                        "weight": parseInt(weight),
                        "species": species,
                        "location": location,
                        "bait": bait,
                        "captureTime": parseInt(captureTime) }
                })
            });
        })
    });
}