function solve() {
    let buttons = document.querySelectorAll("button");
    let oldInput = 0;
    console.log(oldInput); 

    Array.from(buttons).forEach((btn) => {
        btn.addEventListener("click", function(){

            let output = document.querySelector("#output");
            let num = +document.querySelector("input").value;

            let btnText = btn.textContent;
        
            // if(num === 0){
            //     console.log("hit");
            //     num = 0;
            //     document.querySelector("input").value = 0;
            // }
            
            let currentNum = output.textContent.length < 1 ? num : +output.textContent;
            
            if(oldInput !== num){
                currentNum = num;
            }

            switch (btnText) {
                case "Chop": output.textContent = (+currentNum / 2); oldInput = num; break;
                case "Dice":  output.textContent = Math.sqrt(+currentNum);  oldInput = num; break;
                case "Spice":  output.textContent = +currentNum + 1; oldInput = num; break;
                case "Bake": output.textContent = (+currentNum * 3); oldInput = num; break;
                case "Fillet":  output.textContent = (+currentNum - (+currentNum * +0.20)); oldInput = num; break;
                default:
                break;
            }
            
        })
    });
}

solve();