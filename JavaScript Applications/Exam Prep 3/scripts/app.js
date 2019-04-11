$(() => {
    const app = Sammy('#container', function () {
        this.use("Handlebars", "hbs");

        // Index routes
        this.get("#/home", function(ctx) {
            ctx.loadPartials({
                header: "../templates/common/header.hbs",
                footer: "../templates/common/footer.hbs",
                meme: "../templates/memes/meme.hbs",
                feed: "../templates/memes/feed.hbs",
            }).then(function() {
                let loggedIn = sessionStorage.authtoken !== undefined;
                if(loggedIn){
                    requester.get("appdata", "memes", "kinvey").then((memes) => {
                        let tempMemes = memes;
                        Array.from(tempMemes).forEach((meme) => {
                            let isMine = meme.creator === sessionStorage.username;
                            meme.isMine = isMine;
                        });
                        
                        ctx.memesExist = memes.length !== 0;
                        ctx.memes = tempMemes;
                        ctx.loggedIn = sessionStorage.authtoken !== undefined;
                        this.partial("../../templates/home/home.hbs");
                    });
                } else {
                    ctx.loggedIn = sessionStorage.authtoken !== undefined;
                    this.partial("../../templates/home/home.hbs");
                }
            });
        });
        
        this.get("/", function() {
            this.redirect("#/home");
        });

        this.get("#", function() {
            this.redirect("#/home");
        });

        this.get("#/index", function() {
            this.redirect("#/home");
        });

        this.get("#/", function() {
            this.redirect("#/home");
        });

        // Login routes 
        this.get("#/login", function(ctx){
            ctx.loadPartials({
                header: "../templates/common/header.hbs",
                footer: "../templates/common/footer.hbs"
            }).then(function() {
                ctx.loggedIn = sessionStorage.authtoken !== undefined;
                this.partial("../../templates/login/login.hbs");
            })
        });

        this.post("#/login", function(ctx){
            let username = ctx.params.username;
            let password = ctx.params.password;

            if(username.length > 1 && password.length > 1){
                userService.login(username, password).then((userInfo) => {
                    userService.saveSession(userInfo);
                    this.redirect("#/home");
                    notify.showInfo("Login successful.");    
                }).catch(() => {
                    notify.showError("Invalid username/password combination.");                    
                });
            } else {
                notify.showError("Invalid username/password combination.");                    
            }
        });

        // Register routes 
        this.get("#/register", function(ctx){
            ctx.loadPartials({
                header: "../templates/common/header.hbs",
                footer: "../templates/common/footer.hbs"
            }).then(function() {
                ctx.loggedIn = sessionStorage.authtoken !== undefined;
                this.partial("../../templates/register/register.hbs");
            })
        });

        this.post("#/register", function(ctx){
            let username = ctx.params.username;
            let password = ctx.params.password;
            let repeatPassword = ctx.params.repeatPass;
            let email = ctx.params.email;
            let avatarUrl = ctx.params.avatarUrl;

            if(username.length < 3){
                notify.showError("Username must be at least 3 characters long.");
            } else if(password.length < 6){
                notify.showError("Password must be at least 6 characters long.");
            } else if(password !== repeatPassword){
                notify.showError("Passwords must match.");
            } else {
                userService.register(username, password, repeatPassword, email, avatarUrl).then((userInfo) => {
                    userService.saveSession(userInfo);
                    this.redirect("#/home");
                    notify.showInfo("Registration successful.");    
                }).catch(() => {
                    this.redirect("#/register");
                    notify.showError("User already exists.");
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

        // Memes routes
            //Create a meme
            this.get("#/create", function(ctx){
                ctx.loadPartials({
                    header: "../templates/common/header.hbs",
                    footer: "../templates/common/footer.hbs"
                }).then(function() {
                    ctx.loggedIn = sessionStorage.authtoken !== undefined;
                    this.partial("../../templates/memes/create.hbs");
                });
            });

            this.post("#/create", function(ctx){
                let title = ctx.params.title;
                let description = ctx.params.description;
                let imageUrl = ctx.params.imageUrl;

                if(title.length === 0 || description.length === 0 || imageUrl.length === 0){
                    notify.showError("All input fields are required.")
                } else if(title.length > 33){
                    notify.showError("Title length must be less than 33 characters.")
                } else if(description.length < 30 && description.length > 450){
                    notify.showError("Description length must be at least 30 and not more than 450 characters.")
                } else if(!imageUrl.startsWith("http")){
                    notify.showError("Image URL must use http or https.")
                } else {
                    description = description.replace(/</g, "&lt;")
                        .replace(/>/g, "&gt;");

                    let meme = { title, description, imageUrl, creator: sessionStorage.username };

                    requester.post("appdata", "memes", "kinvey", meme).then(() => {
                        this.redirect("#/home");
                        notify.showInfo("Meme created successfully.")
                    }).catch(() => {
                        notify.showError("Something went wrong.")
                    });
                }
            });

            //Delete meme
            this.get("#/memes/delete/:id", function(ctx){
                let memeId = ctx.params.id;
                requester.remove("appdata", "memes/" + memeId, "Kinvey").then(() => {
                    this.redirect("#/profile");
                    notify.showInfo("Removed meme successfully.");
                }).catch(() => {
                    notify.showError("Invalid meme id.");
                });
            });

            //Edit meme
            this.get("#/memes/edit/:id", function(ctx){
                let memeId = ctx.params.id;
                let loggedIn = sessionStorage.authtoken !== undefined;

                requester.get("appdata", "memes/" + memeId, "Kinvey").then((meme) => {
                    ctx.loadPartials({
                        header: "../templates/common/header.hbs",
                        footer: "../templates/common/footer.hbs"
                    }).then(function(){
                        ctx.loggedIn = loggedIn;
                        ctx.id = meme._id;
                        ctx.title = meme.title;
                        ctx.description = meme.description;
                        ctx.imageUrl = meme.imageUrl;
                        this.partial("../../templates/memes/edit.hbs");
                    });
                });
            });

            this.put("#/memes/edit/:id", function(ctx){
                let memeId = ctx.params.id;
                let title = ctx.params.title;
                let description = ctx.params.description;
                let imageUrl = ctx.params.imageUrl;

                requester.update("appdata", "memes/" + memeId, "Kinvey", { title, description, imageUrl, creator: sessionStorage.username }).then(() => {
                   this.redirect("#/profile");
                   notify.showInfo("Meme edited successfully.");
                }).catch(() => {
                    notify.showInfo("Invalid meme id.")
                });;
            });

            // View meme details
            this.get("#/memes/details/:id", function(ctx){
                let memeId = ctx.params.id;
                let loggedIn = sessionStorage.authtoken !== undefined;

                requester.get("appdata", "memes/" + memeId, "Kinvey").then((meme) => {
                    let isMine = meme.creator === sessionStorage.username;

                    ctx.loadPartials({
                        header: "../templates/common/header.hbs",
                        footer: "../templates/common/footer.hbs"
                    }).then(function(){
                        ctx.isMine = isMine;
                        ctx.loggedIn = loggedIn;
                        ctx.id = meme._id;
                        ctx.title = meme.title;
                        ctx.description = meme.description;
                        ctx.imageUrl = meme.imageUrl;
                        ctx.creator = meme.creator;
                        this.partial("../../templates/memes/details.hbs");
                    });
                });
            });

        // User routes

            // User profile route
            this.get("#/profile", function(ctx){
                requester.get("appdata", "memes", "kinvey").then((memes) => {
                    let myMemes = Array.from(memes).filter((m) => m.creator === sessionStorage.username);
                    let memesExist = myMemes.length !== 0;
                    requester.get("user", sessionStorage.userId, "Kinvey").then((user) => {
                        ctx.loadPartials({
                            header: "../templates/common/header.hbs",
                            footer: "../templates/common/footer.hbs",
                            myMeme: "../templates/memes/user-listed-meme.hbs"
                        }).then(function() {
                            ctx.avatarUrl = user.avatarUrl;
                            ctx.email = user.email;   
                            ctx.loggedIn = sessionStorage.authtoken !== undefined;
                            ctx.memesExist = memesExist;
                            ctx.memes = myMemes;
                            this.partial("../../templates/profile/profile.hbs")
                        });
                    });
                });
            });

            // Delete profile
            this.get("#/users/delete", function(){
                requester.remove("appdata", encodeURI('memes?query={"creator":"' + sessionStorage.username + '"}')).then(() => {
                    requester.remove("user", sessionStorage.userId, "Kinvey").then(() => {
                        this.redirect("#/logout");
                        notify.showInfo("Profile deleted successfully.");
                    }).catch(() => {
                        notify.showError("Invalid user id.");
                    });
                });
            });
    });
    
    app.run();
});