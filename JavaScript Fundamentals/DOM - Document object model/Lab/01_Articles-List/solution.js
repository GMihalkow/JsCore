function solve() {
	var targetSection = document.getElementById("articles");

	if(document.getElementById("createTitle").value.length > 0 && document.getElementById("createContent").value.length > 0){
		var articleTag = document.createElement("article");
		var heading = document.createElement("h3");
		heading.textContent = document.getElementById("createTitle").value;
	
		var paragraph = document.createElement("p");
		paragraph.textContent = document.getElementById("createContent").value;
	
		articleTag.appendChild(heading);
		articleTag.appendChild(paragraph);
	
		targetSection.appendChild(articleTag);
	}
	
	document.getElementById("createTitle").value = "";
	document.getElementById("createContent").value = "";
}