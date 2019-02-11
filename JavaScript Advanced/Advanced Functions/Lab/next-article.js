function getArticleGenerator(input){   
    return function() {
        let resultDiv = document.querySelector("#content");
        let index = resultDiv.children.length;
        console.log(index);
        let article = document.createElement("article");
        article.textContent = input[index];
        if(parseInt(index) > parseInt(input.length) - 1){

        } else {
            resultDiv.appendChild(article); 
            index++;
        }
    }
}