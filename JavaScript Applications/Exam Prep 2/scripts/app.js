

$(() => {
    function toCapitalFirstLetter(text){
        let tempText = text;
        let firstLetter = tempText[0].toUpperCase();
        let result = firstLetter + tempText.substr(1);

        return result;
    };

    const app = Sammy("#site-content", function(){
        this.use("Handlebars", "hbs");

        // Home routes
        this.get("#/home", function(){
            let loggedIn = sessionStorage.authtoken !== undefined;

            if(loggedIn) {
                requester.get("appdata", "pets", "kinvey").then((pets) => { 
                    let neededPets = Array.from(pets).filter((p) => p._acl.creator !== sessionStorage.userId);

                    this.render("../templates/home/home.hbs", { 
                        loggedIn: sessionStorage.authtoken !== undefined,
                        username: sessionStorage.username,
                        pets: neededPets }, null, {
                        header: "../templates/common/header.hbs", 
                        footer: "../templates/common/footer.hbs",
                        dashboard: "../templates/pets/dashboard.hbs",
                        otherPet: "../templates/pets/otherPet.hbs"
                    }).then(function(result){
                        this.swap(result);
                    });  
                });
            } else {   
                this.render("../templates/home/home.hbs", { 
                    loggedIn: sessionStorage.authtoken !== undefined,
                    username: sessionStorage.username,
                    pets: [] }, null, {
                    header: "../templates/common/header.hbs", 
                    footer: "../templates/common/footer.hbs",
                    dashboard: "../templates/pets/dashboard.hbs",
                    otherPet: "../templates/pets/otherPet.hbs"
                }).then(function(result){
                    this.swap(result);
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

        // Register routes
        this.get("#/register", function(){
            this.render("../templates/register/register.hbs", { 
                loggedIn: sessionStorage.authtoken !== undefined,
                username: sessionStorage.username }, null, {
                header: "../templates/common/header.hbs", 
                footer: "../templates/common/footer.hbs"
            }).then(function(result){
                this.swap(result);
            });  
        });

        this.post("#/register", function(context){
           let username = context.params.username;
           let password = context.params.password;

           userHandler.register(username, password).then((userInfo) => {
                if(username.length < 3) {
                    this.redirect("#/register");
                    notify.showError("Username must be at least 3 symbols.")
                } else if(password.length < 6) {
                    this.redirect("#/register");
                    notify.showError("Password must be at least 6 symbols.")
                } else {
                    userHandler.saveSession(userInfo);
                    this.redirect("#/home");
                    notify.showInfo("User registration successful.");
                }
           }).catch(() => {
                this.redirect("#/register");
                notify.showError("Username already exists.");
           });
        });

        // Login routes
        this.get("#/login", function(){
            this.render("../templates/login/login.hbs", { 
                loggedIn: sessionStorage.authtoken !== undefined,
                username: sessionStorage.username }, null, {
                header: "../templates/common/header.hbs", 
                footer: "../templates/common/footer.hbs"
            }).then(function(result){
                this.swap(result);
            });  
        });
        
        this.post("#/login", function(context){
            let username = context.params.username;
            let password = context.params.password;
 
            userHandler.login(username, password).then((userInfo) => {
                userHandler.saveSession(userInfo);
                this.redirect("#/home");
                notify.showInfo("Login successful.");
            }).catch(() => {
                 this.redirect("#/login");
                 notify.showError("Invalid username or password.");
            });
         });

        // Logout routes
        this.get("#/logout", function(){
            userHandler.logout();
            userHandler.clearSession();
            this.redirect("#/home");
            notify.showInfo("Logout successful.")
        });

        // Pets routes

            // Pets by category
            this.get("#/pets/:category", function(context){
                
                let allowedCategories = {
                    parrot: true,
                    cat: true,
                    dog: true,
                    parrot: true,
                    reptile: true,
                    other: true
                };

                let category = context.params.category.toLowerCase();
                if(allowedCategories[category]){
                    requester.get("appdata", encodeURI('pets?query={"category":"' + toCapitalFirstLetter(category) + '"}'), "kinvey").then((pets) => {
                        let neededPets = Array.from(pets).filter((p) => 
                                p._acl.creator !== sessionStorage.userId && 
                                p.category.toLowerCase() === category).sort((f, s) => s.likes - f.likes);

                        this.render("../templates/home/home.hbs", { 
                            loggedIn: sessionStorage.authtoken !== undefined,
                            username: sessionStorage.username,
                            pets: neededPets }, null, {
                            header: "../templates/common/header.hbs", 
                            footer: "../templates/common/footer.hbs",
                            dashboard: "../templates/pets/dashboard.hbs",
                            otherPet: "../templates/pets/otherPet.hbs"
                        }).then(function(result){
                            this.swap(result);
                        });  
                    });
                } else {
                    this.redirect("#/home");
                    notify.showError("Invalid category name.")
                }
            });

            // Like a pet
            this.get("#/pets/like/:id", function(context){
                let petId = context.params.id;

                requester.get("appdata", "pets/" + petId, "kinvey").then((pet) => {
                    let newLikes = ++pet.likes;

                    requester.update("appdata", "pets/" + petId, "kinvey", {
                        name: pet.name,
                        category: pet.category,
                        likes: newLikes,
                        description: pet.description,
                        imageURL: pet.imageURL
                    }).then(() => {
                        this.redirect(encodeURI("#/pets/details/" + petId));
                    }).catch(() => {
                        this.redirect("#/home");
                        notify.showError("Invalid pet id.");
                    });
                });
            });

            // Pet details
            this.get("#/pets/details/:id", function(context){
                    let petId = context.params.id;

                    requester.get("appdata", "pets/" + petId, "kinvey").then((pet) => {
                    this.render("../templates/pets/details.hbs", { 
                        loggedIn: sessionStorage.authtoken !== undefined,
                        username: sessionStorage.username,
                        pet }, null, {
                        header: "../templates/common/header.hbs", 
                        footer: "../templates/common/footer.hbs"
                    }).then(function(result){
                        this.swap(result);
                    }); 
                });
            });

            // Create a pet
            this.get("#/create", function(){
                this.render("../templates/pets/create.hbs", { 
                    loggedIn: sessionStorage.authtoken !== undefined,
                    username: sessionStorage.username }, null, {
                    header: "../templates/common/header.hbs", 
                    footer: "../templates/common/footer.hbs"
                }).then(function(result){
                    this.swap(result);
                }); 
            });

            this.post("#/create", function(context){
                let name = context.params.name;
                let category = context.params.category;
                let imageURL = context.params.imageURL;
                let description = context.params.description;

                requester.post("appdata", "pets", "kinvey", { name, category, imageURL, description, likes: 0 }).then(() =>{
                    this.redirect("#/home");
                    notify.showInfo("Pet created.");
                }).catch(() => {
                    this.redirect("#/create");
                    notify.showError("Something went wrong.");
                });
            });

            // Delete a pet
            this.get("#/pets/delete/:id", function(context){
                let petId = context.params.id;
                requester.remove("appdata", "pets/" + petId, "kinvey").then(() => {
                    this.redirect("#/home");
                    notify.showInfo("Pet removed successfully!");
                }).catch(() => {
                    this.redirect("#/home");
                    notify.showError("Invalid pet id!");
                });
            });

            // Edit a pet
            this.get("#/pets/edit/:id", function(context){
                let petId = context.params.id;

                requester.get("appdata", "pets/" + petId, "kinvey").then((pet) => {
                    this.render("../templates/pets/edit.hbs", { 
                        loggedIn: sessionStorage.authtoken !== undefined,
                        username: sessionStorage.username,
                        pet }, null, {
                        header: "../templates/common/header.hbs", 
                        footer: "../templates/common/footer.hbs"
                    }).then(function(result){
                        this.swap(result);
                    });  
                });
            });

            this.post("#/pets/edit/:id", function(context){
                let petId = context.params.id;
                let newDescription = context.params.description;
                
                requester.get("appdata", "pets/" + petId, "kinvey").then((pet) => {
                   requester.update("appdata", "pets/" + petId, "kinvey", {
                     name: pet.name,
                     imageURL: pet.imageURL,
                     description: newDescription,
                     category: pet.category
                   }).then(() => {
                       this.redirect("#/my/pets");
                       notify.showInfo("Updated successfully!");
                   }).catch(() => {
                        this.redirect("#/my/pets");
                        notify.showInfo("Something went wrong.");
                   });
                });
            });

            // My pets
            this.get("#/my/pets", function(){
                requester.get("appdata", "pets", "kinvey").then((pets) => { 
                    let neededPets = Array.from(pets).filter((p) => p._acl.creator === sessionStorage.userId);

                        this.render("../templates/pets/my.hbs", { 
                            loggedIn: sessionStorage.authtoken !== undefined,
                            username: sessionStorage.username,
                            pets: neededPets }, null, {
                            header: "../templates/common/header.hbs", 
                            footer: "../templates/common/footer.hbs",
                            myPet: "../templates/pets/myPet.hbs"
                        }).then(function(result){
                            this.swap(result);
                        });  
                    });
            });
        
    });

    app.run();
});