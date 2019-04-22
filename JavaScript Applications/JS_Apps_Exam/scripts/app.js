$(() => {
    const app = new Sammy("#rooter", function(appContext){
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

            this.loadPartials({
                header: this.getHeader(),
                footer: "../templates/common/footer.hbs",
                notFound: "../templates/common/notFound.hbs",
                recipe: "../templates/recipes/indexRecipePartial.hbs",
            }).then(function(){
                let loggedIn = sessionStorage.authtoken !== undefined;

                if(loggedIn){
                    ctx.names = sessionStorage.getItem("fullName");
                    
                    requester.get("appdata", "recipes", "kinvey").then((recipes) => {
                        ctx.recipesExist = recipes.length !== 0;
                        ctx.recipes = recipes;
                        this.partial("../templates/home/loggedInHome.hbs");
                    });
                } else {
                    this.partial("../templates/home/anonymousHome.hbs");
                }
            });
        });

        this.get("/", function(){
            this.redirect("#/home");
        });

        this.get("#/index", function(){
            this.redirect("#/home");
        });

        // Login routes
        this.get("#/login", function(){
            this.loadPartials({
                header: this.getHeader(),
                footer: "../templates/common/footer.hbs"
            }).then(function(){
                let loggedIn = sessionStorage.authtoken !== undefined;

                if(loggedIn){

                } else {
                    this.partial("../templates/login/login.hbs");
                }
            });
        });

        this.post("#/login", function(ctx){
            let username = ctx.params.username;
            let password = ctx.params.password;

            userService.login(username, password).then((userInfo) => {
                userService.saveSession(userInfo);
                this.redirect("#/home");
                notify.showInfo("Login successful.");
            }).catch((error) => {
                notify.showError(error.responseJSON.description);
            });
        });

        // Register routes
        this.get("#/register", function(){
            this.loadPartials({
                header: this.getHeader(),
                footer: "../templates/common/footer.hbs"
            }).then(function(){
                let loggedIn = sessionStorage.authtoken !== undefined;

                if(loggedIn){

                } else {
                    this.partial("../templates/register/register.hbs");
                }
            });
        });

        this.post("#/register", function(ctx){
            let firstName = ctx.params.firstName;
            let lastName = ctx.params.lastName;
            let username = ctx.params.username;
            let password = ctx.params.password;
            let repeatPassword = ctx.params.repeatPassword;

            if(firstName.length < 2){
                notify.showError("FirstName must be at least 2 characters long.");
            } else if(lastName.length < 2){
                notify.showError("LastName must be at least 2 characters long.");
            } else if(username.length < 3){
                notify.showError("Username must be at least 3 characters long.");
            } else if(password.length < 6){
                notify.showError("Password must be at least 6 characters long.");
            } else if(repeatPassword.length < 6){
                notify.showError("Repeated password must be at least 6 characters long.");
            } else if(password !== repeatPassword){
                notify.showError("Passwords don't match!");
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
        
        // Logout route
        this.get("#/logout", function(){
            userService.logout();
            userService.clearSession();
            this.redirect("#/home");
            notify.showInfo("Logout successful.");
        });

        // Recipes routes

            // Share 
            this.get("#/recipes/share", function(ctx){
                this.loadPartials({
                    header: this.getHeader(),
                    footer: "../templates/common/footer.hbs",
                    notFound: "../templates/common/notFound.hbs"
                }).then(function(){
                    ctx.names = sessionStorage.getItem("fullName");
                    this.partial("../templates/recipes/share.hbs");
                });
            });

            this.post("#/recipes/share", function(ctx){
                let meal = ctx.params.meal;
                let ingredients  = ctx.params.ingredients;
                let prepMethod = ctx.params.prepMethod;
                let description = ctx.params.description;
                let foodImageURL = ctx.params.foodImageURL;
                let category = ctx.params.category;

                let realIngredients  = ingredients.split(", ");

                const categoryImageURLs = {
                    "Vegetables and legumes/beans": "https://t3.ftcdn.net/jpg/00/25/90/48/240_F_25904887_fhZJ692ukng3vQxzHldvuN981OiYVlJ1.jpg",
                    "Fruits": "https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029__340.jpg",
                    "Grain Food": "https://cdn.pixabay.com/photo/2014/12/11/02/55/corn-syrup-563796__340.jpg",
                    "Milk, cheese, eggs and alternatives": "https://image.shutterstock.com/image-photo/assorted-dairy-products-milk-yogurt-260nw-530162824.jpg",
                    "Lean meats and poultry, fish and alternatives": "https://t3.ftcdn.net/jpg/01/18/84/52/240_F_118845283_n9uWnb81tg8cG7Rf9y3McWT1DT1ZKTDx.jpg"
                };

                let recipeObj = {
                    meal,
                    ingredients: realIngredients,
                    prepMethod,
                    description,
                    foodImageURL,
                    category,
                    likesCounter: 0,
                    categoryImageURL: categoryImageURLs[category]
                };

                if(meal.length < 4){
                    notify.showError("Meal name must be at least 4 characters long.");
                } else if(realIngredients.length < 2){
                    notify.showError("There should be at least 2 ingredients for the meal.");
                } else if(prepMethod.length < 10){
                    notify.showError("Preparation method name must be at least 10 characters long.");
                } else if(!foodImageURL.startsWith("http://") && !foodImageURL.startsWith("https://")){
                    notify.showError("Food image URL must use the http protocol.");
                } else if(!Object.keys(categoryImageURLs).includes(category)){
                    notify.showError("You must select a category.");
                } else {
                    requester.post("appdata", "recipes", "kinvey", recipeObj).then(() => {
                        this.redirect("#/home");
                        notify.showInfo("Recipe shared successfully!");
                    }).catch((error) => {
                        notify.showError(error.responseJSON.description);
                    });
                }
            });

            // Details
            this.get("#/recipes/details/:id", function(ctx){
                let recipeId = ctx.params.id;

                requester.get("appdata", "recipes/" + recipeId, "kinvey").then((recipe) => {
                    this.loadPartials({
                        header: this.getHeader(),
                        footer: "../templates/common/footer.hbs"
                    }).then(function(){
                        ctx.names = sessionStorage.getItem("fullName");
                        ctx.isMine = sessionStorage.userId === recipe._acl.creator;
                        ctx.recipe = recipe;
                        this.partial("../templates/recipes/details.hbs");
                    });
                }).catch((error) => {
                    notify.showError(error.responseJSON.description);
                });
            });

            // Edit
            this.get("#/recipes/edit/:id", function(ctx){
                let recipeId = ctx.params.id;
                
                requester.get("appdata", "recipes/" + recipeId, "kinvey").then((recipe) => {
                    this.loadPartials({
                        header: this.getHeader(),
                        footer: "../templates/common/footer.hbs"
                    }).then(function(){
                        ctx.names = sessionStorage.getItem("fullName");
                        ctx.ingredientsString = recipe.ingredients.join(", ");
                        ctx.recipe = recipe;
                        ctx.categories = [
                            {
                                title: "Vegetables and legumes/beans",
                                isCategory: recipe.category === "Vegetables and legumes/beans"
                            },
                            {
                                title: "Fruits",
                                isCategory: recipe.category === "Fruits"
                            },
                            {
                                title: "Grain Food",
                                isCategory: recipe.category === "Grain Food"
                            },
                            {
                                title: "Milk, cheese, eggs and alternatives",
                                isCategory: recipe.category === "Milk, cheese, eggs and alternatives"
                            },
                            {
                                title: "Lean meats and poultry, fish and alternatives",
                                isCategory: recipe.category === "Lean meats and poultry, fish and alternatives"
                            }
                        ];
                        
                        this.partial("../templates/recipes/edit.hbs");
                    });
                }).catch((error) => {
                    notify.showError(error.responseJSON.description);
                });

            });

            this.put("#/recipes/edit/:id", function(ctx){
                let recipeId = ctx.params.id;

                let meal = ctx.params.meal;
                let ingredients  = ctx.params.ingredients;
                let prepMethod = ctx.params.prepMethod;
                let description = ctx.params.description;
                let foodImageURL = ctx.params.foodImageURL;
                let category = ctx.params.category;

                let realIngredients  = ingredients.split(", ");

                const categoryImageURLs = {
                    "Vegetables and legumes/beans": "https://t3.ftcdn.net/jpg/00/25/90/48/240_F_25904887_fhZJ692ukng3vQxzHldvuN981OiYVlJ1.jpg",
                    "Fruits": "https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029__340.jpg",
                    "Grain Food": "https://cdn.pixabay.com/photo/2014/12/11/02/55/corn-syrup-563796__340.jpg",
                    "Milk, cheese, eggs and alternatives": "https://image.shutterstock.com/image-photo/assorted-dairy-products-milk-yogurt-260nw-530162824.jpg",
                    "Lean meats and poultry, fish and alternatives": "https://t3.ftcdn.net/jpg/01/18/84/52/240_F_118845283_n9uWnb81tg8cG7Rf9y3McWT1DT1ZKTDx.jpg"
                };

                requester.get("appdata", "recipes/" + recipeId, "kinvey").then((recipe) => {
                    let recipeObj = {
                        meal,
                        ingredients: realIngredients,
                        prepMethod,
                        description,
                        foodImageURL,
                        category,
                        categoryImageURL: categoryImageURLs[category],
                        likesCounter: recipe.likesCounter
                    };
                    
                    requester.update("appdata", "recipes/" + recipeId, "kinvey", recipeObj).then(() => {
                        this.redirect("#/home");
                        notify.showInfo("Recipe edited successfully!");
                    }).catch((error) => {
                        notify.showError(error.responseJSON.description);
                    });
                });
            });

            // Archive
            this.get("#/recipes/archive/:id", function(ctx){
                let recipeId = ctx.params.id;

                requester.remove("appdata", "recipes/" + recipeId, "kinvey").then(() => {
                    this.redirect("#/home");
                    notify.showInfo("Your recipe was archived.");
                }).catch((error) => {
                    notify.showError(error.responseJSON.description);
                })
            });

            // Like
            this.get("#/recipes/like/:id", function(ctx){
                let recipeId = ctx.params.id;

                requester.get("appdata", "recipes/" + recipeId, "kinvey").then((recipe) => {
                    recipe.likesCounter++;
                
                    requester.update("appdata", "recipes/" + recipeId, "kinvey", recipe).then(() => {    
                        this.redirect("#/home");
                        notify.showInfo("You liked that recipe.");                        
                    }).catch((error) => {
                        notify.showError(error.responseJSON.description);
                    });
    
                }).catch((error) => {
                    notify.showError(error.responseJSON.description);
                });
            });
    });

    app.run();
});