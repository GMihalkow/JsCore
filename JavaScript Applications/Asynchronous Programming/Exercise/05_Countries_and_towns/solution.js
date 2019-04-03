function solve() {
    let countriesTable = $("#results");
    let townsTable = $("#towns");

    function appendCountries(data, countriesTable) {
        countriesTable.html(
            "<tbody>" +
            "<tr>" +
            "<th>ID</th>" +
            "<th>Name</th>" +
            "<th>Actions</th>" +
            "</tr>" +
            "</tbody>")

        Array.from(data).forEach((country) => {
            countriesTable.append(
                "<tr>"
                +
                "<td>" + country._id + "</td>"
                +
                "<td>" + country.name + "</td>"
                +
                "<td><button class='m-10 delete-btn'>Delete</button></td>"
                +
                "</tr>");
        });
    };

    function appendTowns(data, townsTable) {
        townsTable.html(
            "<tbody>" +
                "<tr>" +
                    "<th>ID</th>" +
                    "<th>Name</th>" +
                    "<th>Country</th>" +
                    "<th>Actions</th>" +
                "</tr>" +
            "</tbody>")

        Array.from(data).forEach((town) => {
            townsTable.append(
                "<tr>"
                +
                "<td>" + town._id + "</td>"
                +
                "<td>" + town.name + "</td>"
                +
                "<td>" + town.country + "</td>"
                +
                "<td><button class='m-10 delete-btn'>Delete</button></td>"
                +
                "</tr>");
        });
    };

    // Displaying the listed countries
    let listBtn = $("#listBtn");
    listBtn.on("click", function () {
        $.ajax({
            url: 'https://baas.kinvey.com/appdata/kid_B1K_U76PV/Countries',
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa("guest:guest"));
            }
        }).then((countries) => {
            appendCountries(countries, countriesTable);

            // Delete country functionality
            $("#results .delete-btn").on("click", function (e) {
                let btn = $(e.target);
                let id = btn.parent().parent().children().first().text();
                let row = btn.parent().parent();

                $.ajax({
                    url: 'https://baas.kinvey.com/appdata/kid_B1K_U76PV/Countries/' + id,
                    type: 'DELETE',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Basic " + btoa("guest:guest"));
                    }
                }).then(() => {
                    row.remove();
                });
            });
        });
    });

    // Displaying the towns by countries
    let townsByCountryBtn = $("#listByCountriesBtn");
    townsByCountryBtn.on("click", function () {
        let countryName = $("#townsByCountry .name").val();

        $.ajax({
            url: encodeURI('https://baas.kinvey.com/appdata/kid_B1K_U76PV/Towns?query={"country":"' + countryName + '"}'),
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa("guest:guest"));
            }
        }).then((towns) => {
            if(towns.length === 0){
                let notificationElement = $("#notification");
                notificationElement.addClass("text-danger");
                notificationElement.removeClass("text-success");
                notificationElement.text("No towns with this country found.")
            } else {
                appendTowns(towns, townsTable);

                // Delete town functionality
                $("#towns .delete-btn").on("click", function (e) {
                   let btn = $(e.target);
                   let id = btn.parent().parent().children().first().text();
                   let row = btn.parent().parent();
   
                   $.ajax({
                       url: 'https://baas.kinvey.com/appdata/kid_B1K_U76PV/Towns/' + id,
                       type: 'DELETE',
                       beforeSend: function (xhr) {
                           xhr.setRequestHeader("Authorization", "Basic " + btoa("guest:guest"));
                       }
                   }).then(() => {
                       row.remove();
                   });
               });
            }
        });

        $("#townsByCountry .name").val("");
    });

    // Show country form functionality
    let showCountryFormBtn = $("#showCountryFormBtn");
    showCountryFormBtn.on("click", function () {
        let creatCountryForm = $("#createCountry");
        if (creatCountryForm.css("display") === "none") {
            creatCountryForm.show();
            $("#editCountry").hide();
        } else {
            creatCountryForm.hide();
        }

        $("#notification").text("");
    });

    // Create a country functionality
    let createCountryBtn = $("#createCountryBtn");
    createCountryBtn.on("click", function () {
        let notificationElement = $("#notification");

        let countryName = $("#createCountry .name").val();
        if (countryName.length === 0) {
            notificationElement.addClass("text-danger");
            notificationElement.text("Invalid country name length! (Country name must be at least 1 character long.)");
        } else {
            $.ajax({
                url: 'https://baas.kinvey.com/appdata/kid_B1K_U76PV/Countries',
                type: 'POST',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Basic " + btoa("guest:guest"));
                },
                data: { name: countryName }
            }).then(() => {
                notificationElement.addClass("text-success");
                notificationElement.text("Country created successfully!");

                $("#createCountry .name").val("");
            });
        }
    });

    // Show edit form functionality
    let showEditCountryFormBtn = $("#showEditCountryFormBtn");
    showEditCountryFormBtn.on("click", function () {
        let editCountryForm = $("#editCountry");
        if (editCountryForm.css("display") === "none") {
            $("#createCountry").hide();
            editCountryForm.show();
        } else {
            editCountryForm.hide();
        }

        $("#notification").text("");
    });

    // Edit a country functionality
    let editTownBtn = $("#editTownBtn");
    editTownBtn.on("click", function () {
        let notificationElement = $("#notification");

        let townId = $("#createTown .id").val();
        let townName = $("#createTown .name").val();
        let countryName = $("#createTown .country").val();
        let countryExists = true;

        $.ajax({
            url: 'https://baas.kinvey.com/appdata/kid_B1K_U76PV/Towns',
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa("guest:guest"));
            }
        }).then((data) => {
            if(Array.from(data).some((c) => c._id === townId) === false){
                countryExists = false;
            }
             if (countryName.length === 0) {
                notificationElement.addClass("text-danger");
                notificationElement.text("Invalid country name length! (Country name must be at least 1 character long.)");
            } else if(!countryExists){
                notificationElement.addClass("text-danger");
                notificationElement.text("Invalid town ID! Town doesn't exist.");
            } else {
                $.ajax({
                    url: 'https://baas.kinvey.com/appdata/kid_B1K_U76PV/Towns/' + townId,
                    type: 'PUT',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Basic " + btoa("guest:guest"));
                    },
                    data: { name: townName, country: countryName }
                }).then(() => {
                    notificationElement.addClass("text-success");
                    notificationElement.text("Town edited successfully!");
    
                    $("#createTown .id").val("");
                    $("#createTown .name").val("");
                    $("#createTown .country").val("");
                });
            }
        });

       
    });

    // Create a town functionality
    let createTownBtn = $("#createTownBtn");
    createTownBtn.on("click", function () {
        let notificationElement = $("#notification");

        let townName = $("#createTown .name").val();
        let countryName = $("#createTown .country").val();

        if (countryName.length === 0 || townName.length === 0) {
            notificationElement.addClass("text-danger");
            notificationElement.text("Invalid country/town name length! (Country/Town name must be at least 1 character long.)");
        } else {
            $.ajax({
                url: 'https://baas.kinvey.com/appdata/kid_B1K_U76PV/Towns',
                type: 'POST',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Basic " + btoa("guest:guest"));
                },
                data: { name: townName, country: countryName }
            }).then(() => {
                notificationElement.addClass("text-success");
                notificationElement.text("Town created successfully!");

                $("#createTown .name").val("");
                $("#createTown .country").val("");
            });
        }
    });
}