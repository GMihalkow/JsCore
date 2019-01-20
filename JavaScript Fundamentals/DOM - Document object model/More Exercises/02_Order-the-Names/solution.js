    function solve(){
        
        let rows = document.querySelectorAll("li");

        let inputField = document.querySelector("input");

        let alphabetArr = ["a", "b", "c", "d", "e", "f", "g", "h","i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

        let registerBtn = document.querySelector("button");
        registerBtn.addEventListener("click", function() {
            
            let name = inputField.value;
            if(Number(name.length) > 0){
                let firstLetter = name[0].toLowerCase();
                for(i=0; i< alphabetArr.length; i++){
                    if(firstLetter == alphabetArr[i]){
                        
                        if(Number(rows[i].innerHTML.length) != 0){

                            let rowContent = rows[i].innerHTML.split(", ");
                        
                            rowContent.push(name);

                            rowContent = rowContent.sort();

                            rows[i].innerHTML = rowContent.join(", ");
                        }
                        else{
                            rows[i].innerHTML += name;
                        }

                    }
                    
                    inputField.value = "";
                }
            }
        });
    }
