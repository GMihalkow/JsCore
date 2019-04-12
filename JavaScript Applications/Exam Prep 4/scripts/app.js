$(() => {
    const app = Sammy('#container', function () {
        this.use("Handlebars", "hbs");

        // Home routes
        this.get("#/home", function(ctx){
            let loggedIn = sessionStorage.authtoken !== undefined;
            
            if(loggedIn){
                requester.get("appdata", "cars", "kinvey").then((cars) => {
                    ctx.loadPartials({
                        header: "../templates/common/header.hbs",
                        footer: "../templates/common/footer.hbs",
                        listing: "../templates/cars/cars-listing.hbs"
                    }).then(function(){
                        Array.from(cars).forEach((car) => {
                            if(car.seller === sessionStorage.username){
                                car.isMine = true;
                            } else{
                                car.isMine = false;
                            }
                        });
    
                        ctx.cars = cars;
                        ctx.carsExist = cars.length !== 0;
                        ctx.username = sessionStorage.username;
                        ctx.loggedIn = loggedIn;
                        this.partial("../templates/home/home.hbs");
                    });
                });
            } else {
                ctx.loadPartials({
                    header: "../templates/common/header.hbs",
                    footer: "../templates/common/footer.hbs"
                }).then(function(){
                    ctx.username = sessionStorage.username;
                    ctx.loggedIn = loggedIn;
                    this.partial("../templates/home/home.hbs");
                });
            }
        });

        this.get("/", function(){
            this.redirect("#/home");
        });
        
        this.get("#/", function(){
            this.redirect("#/home");
        });
        
        this.get("#/index", function(){
            this.redirect("#/home");
        });

        // Login Routes
        this.get("#/login", function(ctx){
            ctx.loadPartials({
                header: "../templates/common/header.hbs",
                footer: "../templates/common/footer.hbs"
            }).then(function(){
                ctx.username = sessionStorage.username;
                ctx.loggedIn = sessionStorage.authtoken !== undefined;
                this.partial("../templates/login/login.hbs");
            });
        });

        this.post("#/login", function(ctx){
            let username = ctx.params.username;
            let password = ctx.params.password;
            
            userService.login(username, password).then((userInfo) => {
                userService.saveSession(userInfo);
                this.redirect("#/home");
                notify.showInfo("Login successful.");
            }).catch(() => {
                notify.showError("Error. Invalid username/password.")
            });
            
        });

        // Register Routes
        this.get("#/register", function(ctx){
            ctx.loadPartials({
                header: "../templates/common/header.hbs",
                footer: "../templates/common/footer.hbs"
            }).then(function(){
                ctx.username = sessionStorage.username;
                ctx.loggedIn = sessionStorage.authtoken !== undefined;
                this.partial("../templates/register/register.hbs");
            });
        });

        this.post("#/register", function(ctx){
            let username = ctx.params.username;
            let password = ctx.params.password;
            let repeatPass = ctx.params.repeatPass;

            if(username.length < 3){
                notify.showError("Username should be at least 3 characters long.");
            } else if(password.length < 6){
                notify.showError("Password should be at least 6 characters long.");
            } else if(repeatPass.length < 6){
                notify.showError("Repeat password should be at least 6 characters long.");
            } else if(password !== repeatPass){
                notify.showError("Passwords don't match.");
            } else {
                userService.register(username, password, repeatPass).then((userInfo) => {
                    userService.saveSession(userInfo);
                    this.redirect("#/home");
                    notify.showInfo("User registration successful.");
                }).catch(() => {
                    notify.showError("User already exists.")
                });
            }
        });

        // Logout route
        this.get("#/logout", function(){
            userService.logout();
            userService.clearSession();
            this.redirect("#/home");
            notify.showInfo("Logout successful.");
        });

        // Cars routes

            // Create listing
            this.get("#/create", function(ctx){
                ctx.loadPartials({
                    header: "../templates/common/header.hbs",
                    footer: "../templates/common/footer.hbs"
                }).then(function(){
                    ctx.username = sessionStorage.username;
                    ctx.loggedIn = sessionStorage.authtoken !== undefined;
                    this.partial("../templates/cars/create-listing.hbs");
                });
            });

            this.post("#/create", function(ctx){
                let title = ctx.params.title;
                let description = ctx.params.description.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                let brand = ctx.params.brand;
                let model = ctx.params.model;
                let year = ctx.params.year;
                let imageUrl = ctx.params.imageUrl;
                let fuelType = ctx.params.fuelType;
                let price = ctx.params.price;
                
                if(title.length > 33){
                    notify.showError("Title must be maximum 33 characters long.");
                } else if(description.length < 30 && description.length > 450){
                    notify.showError("Description must be at least 30 characters long and maximum 450 characters long.");
                } else if(brand.length > 11 && model.length > 11 && fuelType.length > 11){
                    notify.showError("Brand, fuel type and model must be maximum 11 characters long.");
                } else if(model.length < 4){
                    notify.showError("Model must be at least 4 characters long.");
                } else if(year.length < 4){
                    notify.showError("Year must be at least 4 characters long.");
                } else if(price > 1000000){
                    notify.showError("Price cannot exceed 1000000$.");
                } else if(!imageUrl.startsWith("http")){
                    notify.showError("Image URL must use the http protocol.");
                } else if(title.length === 0 || description.length === 0 || brand.length === 0 ||
                        model.length === 0 || year.length === 0 || imageUrl.length === 0 || fuelType.length === 0 || price.length === 0){
                    notify.showError("All input fields must be filled.");
                } else{
                    requester.post("appdata", "cars", "kinvey", { title, brand, model, description, year, imageUrl, fuel: fuelType, price, seller: sessionStorage.username}).then(() => {
                        this.redirect("#/cars/details/" + ctx.params.id);
                        notify.showInfo("Listing created successfully.");
                    }).catch(() => {
                        notify.showError("Something went wrong.");
                    });
                }
            });

            // Edit listing
            this.get("#/edit/:id", function(ctx){
                let carId = ctx.params.id;
                
                requester.get("appdata", "cars/" + carId, "kinvey").then((car) => {
                ctx.loadPartials({
                        header: "../templates/common/header.hbs",
                        footer: "../templates/common/footer.hbs"
                    }).then(function(){
                        ctx.car = car;
                        ctx.username = sessionStorage.username;
                        ctx.loggedIn = sessionStorage.authtoken !== undefined;
                        this.partial("../templates/cars/edit-listing.hbs");
                    });
                });
            });

            this.put("#/edit/:id", function(ctx){
                let title = ctx.params.title;
                let description = ctx.params.description.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                let brand = ctx.params.brand;
                let model = ctx.params.model;
                let year = ctx.params.year;
                let imageUrl = ctx.params.imageUrl;
                let fuelType = ctx.params.fuelType;
                let price = ctx.params.price;
                
                if(title.length > 33){
                    notify.showError("Title must be maximum 33 characters long.");
                } else if(description.length < 30 && description.length > 450){
                    notify.showError("Description must be at least 30 characters long and maximum 450 characters long.");
                } else if(brand.length > 11 && model.length > 11 && fuelType.length > 11){
                    notify.showError("Brand, fuel type and model must be maximum 11 characters long.");
                } else if(model.length < 4){
                    notify.showError("Model must be at least 4 characters long.");
                } else if(year.length < 4){
                    notify.showError("Year must be at least 4 characters long.");
                } else if(price > 1000000){
                    notify.showError("Price cannot exceed 1000000$.");
                } else if(!imageUrl.startsWith("http")){
                    notify.showError("Image URL must use the http protocol.");
                } else if(title.length === 0 || description.length === 0 || brand.length === 0 ||
                        model.length === 0 || year.length === 0 || imageUrl.length === 0 || fuelType.length === 0 || price.length === 0){
                    notify.showError("All input fields must be filled.");
                } else{
                    requester.update("appdata", "cars/" + ctx.params.id, "kinvey", { title, brand, model, description, year, imageUrl, fuel: fuelType, price, seller: sessionStorage.username}).then(() => {
                        this.redirect("#/cars/details/" + ctx.params.id);
                        notify.showInfo("Listing edited successfully.");
                    }).catch(() => {
                        notify.showError("Something went wrong.");
                    });
                }
            });

            // Delete listing
            this.get("#/delete/:id", function(ctx){
                let carId = ctx.params.id;

                requester.remove("appdata", "cars/" + carId, "kinvey").then(() => {
                    this.redirect("#/home");
                    notify.showInfo("Car deleted successfully.");
                }).catch(() => {
                    notify.showError("Invalid car id.");
                });
            });

            // My listings
            this.get("#/my/cars", function(ctx){
                requester.get("appdata", encodeURI('cars?query={"seller":"' + sessionStorage.username + '"}'), "kinvey").then((cars) => {
                    ctx.loadPartials({
                        header: "../templates/common/header.hbs",
                        footer: "../templates/common/footer.hbs",
                        myListing: "../templates/cars/my-listing.hbs"
                    }).then(function(){
                        ctx.cars = cars;
                        ctx.carsExist = cars.length !== 0;
                        ctx.username = sessionStorage.username;
                        ctx.loggedIn = sessionStorage.authtoken !== undefined;
                        this.partial("../templates/cars/my-cars.hbs");
                    });
                });
            });

            // Listing details
            this.get("#/cars/details/:id", function(ctx){
                let carId = ctx.params.id;

                requester.get("appdata", "cars/" + carId, "kinvey").then((car) => {
                    ctx.loadPartials({
                        header: "../templates/common/header.hbs",
                        footer: "../templates/common/footer.hbs",
                    }).then(function(){
                        ctx.car = car;
                        ctx.username = sessionStorage.username;
                        ctx.loggedIn = sessionStorage.authtoken !== undefined;
                        this.partial("../templates/cars/car-details.hbs");
                    });

                }).catch(() => {
                    notify.showError("Invalid car id.");
                });
            });
    });
    
    app.run();
});