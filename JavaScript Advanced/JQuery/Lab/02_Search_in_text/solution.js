function search(){
    let searchText = $("#searchText").val();

    $("#towns li").css("font-weight", "");  
      
    $("#towns li")
        .toArray()
        .filter((li) => li.textContent.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
        .forEach((li) => {
            li.style = "font-weight:bold";
        });
    
    const matchesLength = $("#towns li").toArray()
        .filter((li) => li.textContent.toLowerCase().indexOf(searchText.toLowerCase()) > -1).length;

    let resultDiv = $("#result");
    resultDiv.text(matchesLength.toString() + " matches found.");
}