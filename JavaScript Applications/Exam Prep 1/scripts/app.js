$(() => {
    const app = Sammy("#container", function(){
        this.use("Handlebars", "hbs");

        // Home routes
        this.get("#/home", function(){
            this.render("../templates/home/home.hbs", { 
                loggedIn: sessionStorage.authtoken !== undefined,
                username: sessionStorage.username }, null, {
                header: "../templates/common/header.hbs", 
                footer: "../templates/common/footer.hbs"
            }).then(function(result){
                this.swap(result);
            });  
        });

        this.get("#/", function(){
            this.redirect("#/home");
        });

        this.get("#/index", function(){
            this.redirect("#/home");
        });

        //  Login routes
        this.get("#/login", function(){
            this.render("../templates/login/login.hbs", {}, null, {
                header: "../templates/common/header.hbs", 
                footer: "../templates/common/footer.hbs"
            }).then(function(result){
                this.swap(result);
            });  
        });

        this.post("#/login", function(context){
            let username = context.params.username;
            let password = context.params.password;

            usersHandler.login(username, password).then((userInfo) => {
                usersHandler.saveSession(userInfo);
                this.redirect("#/home");
                notify.showInfo("Login successful.");
            }).catch(() => {
                this.redirect("#/login");
                notify.showError("Error. Invalid credentials, please try again.");
            });
        });

        //  Register routes
        this.get("#/register", function(){
            this.render("../templates/register/register.hbs", {}, null, {
                header: "../templates/common/header.hbs", 
                footer: "../templates/common/footer.hbs"
            }).then(function(result){
                this.swap(result);
            });  
        });

        this.post("#/register", function(context){
            let username = context.params.username;
            let password = context.params.password;

            usersHandler.register(username, password).then((userInfo) => {
            if(username.length < 3){
                this.redirect("#/register");
                notify.showError("Username should be at least 3 characters long.");
            } else if(password.length < 6){
                this.redirect("#/register");
                notify.showError("Password should be at least 6 characters long.");
            } else {
                usersHandler.saveSession(userInfo);
                this.redirect("#/home");
                notify.showInfo("User registration successful.");
            }
            }).catch(() => {
                this.redirect("#/login");
                notify.showError("Error. Username already exists.");
            });
        });

        // Logout route
        this.get("#/logout", function(){
            usersHandler.logout();
            usersHandler.clearSession();

            this.redirect("#/login");

            notify.showError("Logout successfull.")
        });

        // Songs routes
            // All Songs
            this.get("#/all", function(){
                songsHandler.get("appdata", "songs", "kinvey").then((songs) => {
                    this.render("../templates/songs/allSongs.hbs", { 
                        loggedIn: sessionStorage.authtoken !== undefined,
                        username: sessionStorage.username,
                        songs: Array.from(songs).sort((s, ss) => {
                            return (s._acl.creator !== sessionStorage.userId && ss.likes - s.likes); 
                        }).sort((s, ss) => {
                            return (s._acl.creator === sessionStorage.userId && (ss.likes - s.likes || ss.listened - s.listened)); 
                        }).map((song) =>{
                            song.isMine = (song._acl.creator === sessionStorage.userId);
                            return song;
                        })
                        }, null, {
                        header: "../templates/common/header.hbs", 
                        footer: "../templates/common/footer.hbs",
                        song: "../templates/songs/song.hbs"
                    }).then(function(result){
                        this.swap(result);
                    });  
                });
            });

            // My Songs
            this.get("#/my", function(){
                songsHandler.get("appdata", "songs", "kinvey").then((songs) => {
                    this.render("../templates/songs/mySongs.hbs", { 
                        loggedIn: sessionStorage.authtoken !== undefined,
                        username: sessionStorage.username,
                        songs: Array.from(songs)
                            .map((song) =>{
                                song.isMine = (song._acl.creator === sessionStorage.userId);
                                return song;
                            })
                            .filter((song) => song._acl.creator === sessionStorage.userId).sort((s, ss) => {
                                return ss.likes - s.likes || ss.listned - s.listened; 
                            })}, null, {
                        header: "../templates/common/header.hbs", 
                        footer: "../templates/common/footer.hbs",
                        song: "../templates/songs/song.hbs"
                    }).then(function(result){
                        this.swap(result);
                    });  
                });
            });

                // Create song route
                this.get("#/create", function(){
                    this.render("../templates/songs/createSong.hbs", { 
                        loggedIn: sessionStorage.authtoken !== undefined,
                        username: sessionStorage.username
                        }, null, {
                        header: "../templates/common/header.hbs", 
                        footer: "../templates/common/footer.hbs"
                    }).then(function(result){
                        this.swap(result);
                    });  
                });

                this.post("#/create", function(context){
                    let title = context.params.title;
                    let artist = context.params.artist;
                    let imageURL = context.params.imageURL;

                    if(title.length < 6) {
                        this.redirect("#/create");
                        notify.showError("Song title must be at least 6 characters long.");
                    } else if(artist.length < 3) {
                        this.redirect("#/create");
                        notify.showError("Artist name must be at least 3 characters long.");
                    } else if(!(imageURL.startsWith("http://") || imageURL.startsWith("https://"))) {
                        this.redirect("#/create");
                        notify.showError("Image URL must use either http or https protocol.");
                    } else{
                        songsHandler.post("appdata", "songs", "kinvey", {title, artist, imageURL, likes: 0, listened: 0}).then(() => {
                            this.redirect("#/all");
                            notify.showInfo("Song created successfully.");
                        });
                    }
                });

                // Like / Listen / Remove song

                    // Like
                    this.get("#/like/:id", function(context){
                        let songId = context.params.id;
                        songsHandler.get("appdata", "songs/" + songId, "kinvey").then((song) => {
                            let newLikes = ++song.likes;
                            songsHandler.update("appdata", "songs/" + songId, "kinvey", {
                                title: song.title,
                                artist: song.artist,
                                listened: song.listened,
                                imageURL: song.imageURL,
                                likes: newLikes
                                });

                            this.redirect("#/all");

                            notify.showInfo("Liked!");
                        }).catch(() => {
                            notify.showError("Invalid song id.")
                        });
                    });

                    // Listen
                    this.get("#/listen/:id", function(context){
                        let songId = context.params.id;
                        songsHandler.get("appdata", "songs/" + songId, "kinvey").then((song) => {
                            let newListens = ++song.listened;
                            songsHandler.update("appdata", "songs/" + songId, "kinvey", {
                                title: song.title,
                                artist: song.artist,
                                listened: newListens,
                                imageURL: song.imageURL,
                                likes: song.likes
                                });

                            this.redirect("#/all");

                            notify.showInfo("You just listened " + song.title);
                        }).catch(() => {
                            notify.showError("Invalid song id.")
                        });
                    });

                    // Remove
                    this.get("#/remove/:id", function(context){
                        let songId = context.params.id;
                        songsHandler.get("appdata", "songs/" + songId, "kinvey").then((song) => {
                            songsHandler.remove("appdata", "songs/" + songId, "kinvey");

                            this.redirect("#/all");

                            notify.showInfo("Song removed successfully!");
                        }).catch(() => {
                            notify.showError("Invalid song id.")
                        });
                    });
    });

    app.run();
});