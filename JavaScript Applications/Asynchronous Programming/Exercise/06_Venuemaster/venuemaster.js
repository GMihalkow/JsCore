function attachEvents(){
    let venuesElement = $("#venue-info");

    let getBtn = $("#getVenues");
    getBtn.on("click", function(){
        let venueDate = $("#venueDate").val();
        // Getting the ids of the venues for that date
        $.ajax({
            url: 'https://baas.kinvey.com/rpc/kid_BJ_Ke8hZg/custom/calendar?query=' + venueDate,
            type: 'POST',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa("top:secret"));
            }
        }).then((venues) => {
            // Visualising the venues in the html
            Array.from(venues).forEach((id) => {
                $.ajax({
                    url: 'https://baas.kinvey.com/appdata/kid_BJ_Ke8hZg/venues/' + id,
                    type: 'GET',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Basic " + btoa("top:secret"));
                    }
                }).then((venue) => {
                    venuesElement.append(
                        "<div class='venue' id='" + venue._id + "'>"
                        +
                        "<span class='venue-name'><input class='info' type='button' value='More info'>" + venue.name + "</span>"
                        +
                            "<div class='venue-details' style='display: none;'>"
                            +
                                "<table>"
                                +
                                "<tr><th>Ticket Price</th><th>Quantity</th><th></th></tr>"
                                +
                                "<tr>"
                                +
                                "<td class='venue-price'>" + venue.price + " lv</td>"
                                +
                                "<td><select class='quantity'>"
                                +
                                "<option value='1'>1</option>"
                                +
                                "<option value='2'>2</option>"
                                + 
                                "<option value='3'>3</option>"
                                +
                                "<option value='4'>4</option>"
                                +
                                "<option value='5'>5</option>"
                                +
                                "</select></td>"
                                +
                                "<td><input class='purchase' type='button' value='Purchase'></td>"
                                +
                                "</tr>"
                                +
                                "</table>"
                                +
                                "<span class='head'>Venue description:</span>"
                                +
                                "<p class='description'>" + venue.description + "</p>"
                                +
                                "<p class='description'>Starting time: " + venue.startingHour + "</p>"
                            +
                            "</div>"
                            +
                        "</div>");

                    // Displaying the details functionality
                    $("#" + venue._id + " .venue-name .info").on("click", function(){
                        let detailsElement = $("#" + venue._id + " .venue-details");

                        if(detailsElement.css("display") === "none"){
                            detailsElement.show();
                        } else {
                            detailsElement.hide();
                        }
                    });

                    // Purchase functionality
                    $("#" + venue._id + " .venue-details .purchase").on("click", function(){
                        let quantity = $("#" + venue._id + " .venue-details .quantity").val();
                        
                        $.ajax({
                            url: 'https://baas.kinvey.com/rpc/kid_BJ_Ke8hZg/custom/purchase?venue=' + venue._id + "&qty=" + quantity,
                            type: 'POST',
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader("Authorization", "Basic " + btoa("top:secret"));
                            }
                        }).then((response) => {
                            // Displaying the receipt
                            venuesElement.html(response.html);
                            venuesElement.append("<h1>You may print this page as your ticket</h1>");
                        });

                    });
                });
            });
        });
    }); 
}