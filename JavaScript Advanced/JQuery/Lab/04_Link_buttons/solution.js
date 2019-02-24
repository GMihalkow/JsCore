function attachEvents() {
    $(".button").on("click", function(e){
        let currentButton = $(e.target);
        $(".button").removeClass("selected");
        currentButton.addClass("selected");
    });
}