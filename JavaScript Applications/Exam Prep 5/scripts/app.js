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
            let loggedIn = sessionStorage.authtoken !== undefined;

            this.loadPartials({
                header: this.getHeader(loggedIn),
                footer: "../templates/common/footer.hbs",
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

        // Movies create
        this.get("#/movie/cinema", function(ctx){
            let loggedIn = sessionStorage.authtoken !== undefined;

            requester.get("appdata", "movies", "kinvey").then((movies) => {
                this.loadPartials({
                    header: this.getHeader(loggedIn),
                    footer: "../templates/common/footer.hbs",
                    movie: "../templates/movie/movie.hbs"
                }).then(function(){
                    ctx.movies = movies;
                    ctx.username = sessionStorage.username;
                    this.partial("../templates/movie/cinema.hbs");
                }); 
            });
        });

            // Create a movie
            this.get("#/movie/create", function(ctx){
                let loggedIn = sessionStorage.authtoken !== undefined;

                this.loadPartials({
                    header: this.getHeader(loggedIn),
                    footer: "../templates/common/footer.hbs",
                }).then(function(){
                    ctx.username = sessionStorage.username;
                    this.partial("../templates/movie/create.hbs");
                });
            });

            this.post("#/movie/create", function(ctx){
                let title = ctx.params.title;
                let imageUrl = ctx.params.imageUrl;
                let description = ctx.params.description;
                let genres = ctx.params.genres.split(" ");
                let tickets = ctx.params.tickets;

                if(title.length < 6){
                    notify.showError("Title must be at least 6 characters long.");
                } else if(description.length < 10){
                    notify.showError("Description must be at least 10 characters long.");
                } else if(!imageUrl.startsWith("http://") && !imageUrl.startsWith("https://")){
                    notify.showError("Image URL must use the HTTP protocol.");
                } else if(isNaN(tickets)){
                    notify.showError("Tickets must be a number.");
                } else{
                    requester.post("appdata", "movies", "kinvey", { title, imageURL: imageUrl, description, genres, tickets }).then(() => {
                        this.redirect("#/home");
                        notify.showInfo("Movie created successfully.");
                    }).catch(() => {
                        notify.showInfo("Something went wrong.");
                    });
                }
            });

            // Buy tickets for a movie
            this.get("#/movie/ticket/buy/:id", function(ctx){
                let movieId = ctx.params.id;

                requester.get("appdata", "movies/" + movieId, "kinvey").then((movie) => {
                    let movieTickets = movie.tickets;
                    
                    if(movieTickets <= 0){
                        this.redirect("#/movie/cinema");

                        notify.showError("No tickets available for " + movie.title);
                    } else {
                        movie.tickets--;
                        requester.update("appdata", "movies/" + movieId, "kinvey", movie).then(() => {
                            this.redirect("#/movie/cinema");

                            notify.showInfo("Successfully bought ticket for " + movie.title + "!");
                        });
                    }   
                });
            });

            // Movie details
            this.get("#/movie/details/:id", function(ctx){
                let movieId = ctx.params.id;
                
                requester.get("appdata", "movies/" + movieId, "kinvey").then((movie) => {
                    let loggedIn = sessionStorage.authtoken !== undefined;

                    this.loadPartials({
                        header: this.getHeader(loggedIn),
                        footer: "../templates/common/footer.hbs"
                    }).then(function(){
                        ctx.movie = movie;
                        ctx.genres = movie.genres.join(",");
                        ctx.username = sessionStorage.username;
                        this.partial("../templates/movie/details.hbs");
                    });
                });
            });
        
            // My movies
            this.get("#/movie/my", function(ctx){
                let loggedIn = sessionStorage.authtoken !== undefined;

                requester.get("appdata", 'movies?query={"_acl.creator":"' + sessionStorage.userId + '"}', "kinvey").then((movies) => {
                this.loadPartials({
                        header: this.getHeader(loggedIn),
                        footer: "../templates/common/footer.hbs",
                        movie: "../templates/movie/my-movie.hbs"
                    }).then(function(){
                        ctx.movies = movies;
                        ctx.username = sessionStorage.username;
                        this.partial("../templates/movie/my.hbs");
                    }); 
                });
            });

            // Delete movie
            this.get("#/movie/delete/:id", function(ctx){
                let movieId = ctx.params.id;

                let loggedIn = sessionStorage.authtoken !== undefined;

                requester.get("appdata", "movies/" + movieId, "kinvey").then((movie) => {
                    this.loadPartials({
                            header: this.getHeader(loggedIn),
                            footer: "../templates/common/footer.hbs"
                        }).then(function(){
                            ctx.genresString = movie.genres.join(",");
                            ctx.movie = movie;
                            ctx.username = sessionStorage.username;
                            this.partial("../templates/movie/delete.hbs");
                        });
                    }).catch(() => {
                        this.redirect("#/movie/my");
                        notify.showError("Invalid movie Id.");
                    });
            });

            this.post("#/movie/delete/:id", function(ctx){
                let movieId = ctx.params.id;

                requester.remove("appdata", "movies/" + movieId, "kinvey").then(() => {
                    this.redirect("#/home");
                    notify.showInfo("Movie removed successfully!");
                }).catch(() => {
                    this.redirect("#/home");
                    notify.showError("Invalid movie id!");
                });
            });

            // Edit movie
            this.get("#/movie/edit/:id", function(ctx){
                let movieId = ctx.params.id;

                let loggedIn = sessionStorage.authtoken !== undefined;

                requester.get("appdata", "movies/" + movieId, "kinvey").then((movie) => {
                    this.loadPartials({
                            header: this.getHeader(loggedIn),
                            footer: "../templates/common/footer.hbs"
                        }).then(function(){
                            ctx.genresString = movie.genres.join(",");
                            ctx.movie = movie;
                            ctx.username = sessionStorage.username;
                            this.partial("../templates/movie/edit.hbs");
                        });
                    }).catch(() => {
                        this.redirect("#/movie/my");
                        notify.showError("Invalid movie Id.");
                    });
            });

            this.post("#/movie/edit/:id", function(ctx){
                let movieId = ctx.params.id;

                let newMovie = {
                    title: ctx.params.title,
                    description: ctx.params.description,
                    genres: ctx.params.genres.split(","),
                    tickets: ctx.params.tickets,
                    imageURL: ctx.params.imageUrl
                };

                requester.update("appdata", "movies/" + movieId, "kinvey", newMovie).then(() => {
                    this.redirect("#/home");
                    notify.showInfo("Movie edited successfully!");
                }).catch(() => {
                    this.redirect("#/home");
                    notify.showError("Invalid movie id!");
                });
            });

        // Bonus task, search by genre
        this.get("#/movie/cinema/genre", function(ctx){
            let genre = ctx.params.search;
            let loggedIn = sessionStorage.authtoken !== undefined;

            requester.get("appdata", 'movies?query={"genres":"' + genre + '"}', "kinvey").then((movies) => {
                this.loadPartials({
                    header: this.getHeader(loggedIn),
                    footer: "../templates/common/footer.hbs",
                    movie: "../templates/movie/movie.hbs"
                }).then(function(){
                    ctx.movies = movies;
                    ctx.username = sessionStorage.username;
                    this.partial("../templates/movie/cinema.hbs");
                    
                    if(movies.length === 0){
                        notify.showError("No movies with that genre found.");
                    }
                }); 
            });
        });
    });

    app.run();
});