function attachEvents() {
    $("#items li").on("click", function(e){
        let currentItem = $(e.target);
        
        if(typeof(currentItem.attr("data-selected")) !== "undefined"){
            currentItem.removeAttr("data-selected");
            currentItem.removeAttr("style");
        } else {
            currentItem.attr("data-selected", "true");
            currentItem.css("background-color", "#DDD");
        }
    });

    let showBtn = $("#showTownsButton");
    showBtn.on("click", function(){
        let selectedTowns = $("li[data-selected]").map((index, el) => {
            return el.textContent;
        }).toArray();
        
        let resultDiv = $("#selectedTowns");
        resultDiv.text("Selected towns: " + selectedTowns.join(", "));
    });
}