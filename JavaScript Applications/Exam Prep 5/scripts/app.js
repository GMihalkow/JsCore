$(() => {
    const app = Sammy("#container", function(appContext){
        this.use("Handlebars", "hbs");

        // Helpers
        appContext.helper("getHeader", function(loggedIn){
            if(loggedIn){
                return "../templates/common/loggedInHeader.hbs"
            } else{
                return "../templates/common/loggedOutHeader.hbs"
            }
        });

        // Home routes
        this.get("#/home", function(ctx){
            this.loadPartials({
                header: this.getHeader(sessionStorage.authtoken !== undefined),
                footer: "../templates/common/footer.hbs"
            }).then(function(){
                ctx.username = sessionStorage.username;
                this.partial("../templates/home/home.hbs");
            });
        });

        this.get("#/index", function(){
            this.redirect("#/home");
        }); 

        this.get("#/", function(){
            this.redirect("#/home");
        }); 

        this.get("/", function(){
            this.redirect("#/home");
        }); 

        // Login routes 
        this.get("#/login", function(ctx){
            this.loadPartials({
                header: this.getHeader(sessionStorage.authtoken !== undefined),
                footer: "../templates/common/footer.hbs"
            }).then(function(){
                ctx.username = sessionStorage.username;
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
                notify.showError("User doesn't exist.");
            });
        });

        // Register routes 
        this.get("#/register", function(ctx){
            this.loadPartials({
                header: this.getHeader(sessionStorage.authtoken !== undefined),
                footer: "../templates/common/footer.hbs"
            }).then(function(){
                ctx.username = sessionStorage.username;
                this.partial("../templates/register/register.hbs");
            });
        });

        this.post("#/register", function(ctx){
            let username = ctx.params.username;
            let password = ctx.params.password;
            let repeatPassword = ctx.params.repeatPassword;

            if(username < 3){
                notify.showError("Username should be at least 3 characters long.");
            } else if(password < 6){
                notify.showError("Password should be at least 6 characters long.");
            } else if(repeatPassword < 6){
                notify.showError("RepeatPassword should be at least 6 characters long.");
            } else if(repeatPassword !== password){
                notify.showError("Passwords must match.");
            } else {
                userService.register(username, password, repeatPassword).then((userInfo) => {
                    userService.saveSession(userInfo);
                    this.redirect("#/home");
                    notify.showInfo("User registration successful.");
                }).catch(() => {
                    notify.showError("User already exists.");
                });
            }
        });

        // Logout route
        this.get("#/logout", function(){
            userService.logout();
            userService.clearSession();
            this.redirect("#/login");

            notify.showInfo("Logout successful.")
        });
    });

    app.run();
});