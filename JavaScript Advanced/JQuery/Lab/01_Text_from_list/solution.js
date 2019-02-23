function extractText(){
    let result = $("#items li").toArray().map((el) => el.textContent).join(", ");
    let resultDiv = $("#result");
    resultDiv.text(result);
}