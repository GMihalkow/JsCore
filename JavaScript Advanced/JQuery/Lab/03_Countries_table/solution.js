function initializeTable(){
    let createLink = $("#createLink");
    createLink.on("click", function(ev){
        ev.preventDefault();
        ev.stopPropagation();
        let countryName = $("#newCountryText").val();
        let capitalName = $("#newCapitalText").val();
        $("#countriesTable").append("<tr><td>" + countryName.toString() + "</td><td>" + capitalName.toString() + "</td><td><a href='#'>[Up]</a><a href='#'>[Down]</a><a href='#'>[Delete]</a></td></tr>");
        
        $("#countriesTable tr").last().children().last().children().click(function(e){
            e.preventDefault();
            e.stopPropagation();
    
            if(e.target.textContent === "[Up]"){
                let currentSibling = $(e.target.parentNode.parentNode);
                let previousSibling = currentSibling.prev();
                
                currentSibling.insertBefore(previousSibling);
                
            } else if(e.target.textContent === "[Down]"){
                let currentSibling = $(e.target.parentNode.parentNode);
                let nextSibling = currentSibling.next();
                
                currentSibling.insertAfter(nextSibling);
            } else if(e.target.textContent === "[Delete]"){
                $(e.target.parentNode.parentNode).html("");
            }
        });
    });
    
        
}