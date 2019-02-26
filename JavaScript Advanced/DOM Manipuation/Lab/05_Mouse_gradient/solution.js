function attachGradientEvents(){
    let resultDiv = document.getElementById("result");

    let gradient = document.getElementById("gradient");
    gradient.addEventListener("mousemove", function(e){
        let rect = e.target.getBoundingClientRect();
        
        let y = parseInt(e.offsetX);
        let result = Math.floor(((y - parseInt(rect.left)) * 100) / 300);
        
        resultDiv.textContent = result.toString() + "%";
    });
}