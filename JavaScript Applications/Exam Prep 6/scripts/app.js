$(() => {
    const months = [ "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December" ];
    
    const app = Sammy('#container', function (appContext) {
        this.use("Handlebars", "hbs");

        appContext.helper("getHeader", function(){
            let loggedIn = sessionStorage.authtoken !== undefined;
            if(loggedIn){
                return "../templates/common/loggedInHeader.hbs";
            } else{
                return "../templates/common/loggedOutHeader.hbs";
            }
        });

        // Home routes
        this.get("#/home", function(ctx){
            let loggedIn = sessionStorage.authtoken !== undefined;
            
            requester.get("appdata", "flights", "kinvey").then((flights) => {
                this.loadPartials({
                    header: this.getHeader(loggedIn),
                    footer: "../templates/common/footer.hbs",
                    flight: "../templates/flight/added-flight.hbs"
                }).then(function(){
                    
                    Array.from(flights).forEach((fl) => {
                        let date = new Date(fl.departureDate);
                        
                        let dateString = date.getDate() + " " + months[date.getMonth()];

                        fl.dateString = dateString; 
                    });

                    ctx.loggedIn = loggedIn;
                    ctx.flights = flights;
                    ctx.username = sessionStorage.username;
                    this.partial("../templates/flight/catalog.hbs");
                });
            });
        });

        this.get("/", function(){
            this.redirect("#/home");
        });

        this.get("#/index", function(){
            this.redirect("#/home");
        });

        // Register routes
        this.get("#/register", function(){
            let loggedIn = sessionStorage.authtoken !== undefined;
            
            this.loadPartials({
                header: this.getHeader(loggedIn),
                footer: "../templates/common/footer.hbs"
            }).then(function(){
                this.partial("../templates/register/register.hbs");
            });

        });

        this.post("#/register", function(ctx){
            let username = ctx.params.username;
            let password = ctx.params.pass;
            let repeatPassword = ctx.params.checkPass;

            if(username.length < 5){
                notify.showError("Username must be at least 5 characters long.")
            } else if(password.length === 0 || repeatPassword.length === 0){
                notify.showError("Password fields shouldn't be empty.")
            } else if(password !== repeatPassword){
                notify.showError("Passwords don't match.")
            } else {
                userService.register(username, password).then((userInfo) => {
                    userService.saveSession(userInfo);
                    this.redirect("#/home");
                    notify.showInfo("User registration successful.");
                }).catch((error) => {
                    notify.showError(error.responseJSON.description);
                });
            }
        });

        // Login routes
        this.get("#/login", function(){
            let loggedIn = sessionStorage.authtoken !== undefined;
            
            this.loadPartials({
                header: this.getHeader(loggedIn),
                footer: "../templates/common/footer.hbs"
            }).then(function(){
                this.partial("../templates/login/login.hbs");
            });

        });

        this.post("#/login", function(ctx){
            let username = ctx.params.username;
            let password = ctx.params.pass;

            userService.login(username, password).then((userInfo) => {
                userService.saveSession(userInfo);
                this.redirect("#/home");
                notify.showInfo("Login successful.");
            }).catch((error) => {
                notify.showError(error.responseJSON.description);
            });
        });

        // Logout route
        this.get("#/logout", function(){
            userService.logout().then(() => {
                userService.clearSession();
                this.redirect("#/home");
                notify.showInfo("Logout successful.");
            }).catch((error) => {
                notify.showError(error.repeatPassword.description);
            });
        });

        // Flights routes

            // Create a flight
            this.get("#/flights/create", function(ctx){
                let loggedIn = sessionStorage.authtoken !== undefined;
            
                this.loadPartials({
                    header: this.getHeader(loggedIn),
                    footer: "../templates/common/footer.hbs"
                }).then(function(){
                    ctx.loggedIn = loggedIn;
                    ctx.username = sessionStorage.username;
                    this.partial("../templates/flight/add.hbs");
                });
            });

            this.post("#/flights/create", function(ctx){
               let destination = ctx.params.destination;
               let origin = ctx.params.origin;
               let departureDate = ctx.params.departureDate; 
               let departureTime = ctx.params.departureTime; 
               let seats = ctx.params.seats;
               let cost = ctx.params.cost;
               let imageUrl = ctx.params.img;
               let isPublic  = ctx.params.public;
                
                if(isPublic === "on"){
                    isPublic = true;
                } else {
                    isPublic = false;
                }

                if(isNaN(cost) || cost < 0){
                    notify.showError("Cost must be a valid and positive number.");
                } else if(isNaN(seats) || seats < 0){
                    notify.showError("Seats time must be a valid and positive number.");
                } else if(destination.length === 0){
                    notify.showError("Destination length must not be 0.");
                } else if(origin.length === 0){
                    notify.showError("Origin length must not be 0.");
                }

                let flightObj = {
                    destination,
                    origin,
                    seats,
                    cost,
                    imageUrl,
                    isPublic,
                    departureDate,
                    departureTime
                };

                requester.post("appdata", "flights", "kinvey", flightObj).then(() => {
                    this.redirect("#/home");
                    notify.showInfo("Created flight.")
                }).catch((error) => {
                    notify.showError(error.responseJSON.description);
                });
            });

            // Flight details
            this.get("#/flights/details/:id", function(ctx){
               let flightId = ctx.params.id;
               
                let loggedIn = sessionStorage.authtoken !== undefined;
            
                requester.get("appdata", "flights/" + flightId, "kinvey").then((flight) => {
                    this.loadPartials({
                        header: this.getHeader(loggedIn),
                        footer: "../templates/common/footer.hbs"
                    }).then(function(){
                        
                        let date = new Date(flight.departureDate);
                        
                        let dateString = date.getDate() + " " + months[date.getMonth()];

                        flight.dateString = dateString; 
                        
                        ctx.loggedIn = loggedIn;
                        ctx.flight = flight;
                        ctx.username = sessionStorage.username;
                        this.partial("../templates/flight/details.hbs");
                    });
                });
            });
    });

    app.run();
});