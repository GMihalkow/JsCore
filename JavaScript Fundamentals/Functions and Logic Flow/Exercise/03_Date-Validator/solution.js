function solve() {
    // function CheckDate(){
            let checkBtn = document.querySelector("button");
            checkBtn.addEventListener("click", function(){
                
        console.log("hit");
                let outputDiv = document.getElementById("output");

                let year = document.getElementById("year");
                let month = document.getElementById("month");
                let day = document.getElementById("day");

                let validMonths =["January", 
                                "February", 
                                "March", 
                                "April", 
                                "May",
                                "June",
                                "July", 
                                "August", 
                                "September", 
                                "October", 
                                "November",
                                "December" ];
                                
                let isYearValid = +year.value > 0 && +year.value < 9999;
                if(isYearValid){
                    year.value = +year.value;
                }
                let isMonthValid = validMonths.filter((x) => { return x.toString() === month.value.toString(); }).length === 1;

                if(isMonthValid){
                    for(let i=0; i< +validMonths.length; i++){
                        if(validMonths[+i].toString() === month.value.toString()){
                            month.value = (+i + 1);
                            break;
                        }
                    }
                }

                let isDayValid = +day.value > 0 && +day.value < 32;

                if(+day.value < 10){
                    day.value = `0${+day.value}`;
                }

                let paragraph = document.createElement("p");

                if(isYearValid && isMonthValid && isDayValid){

                    let date = new Date(year.value, +month.value - 1, +day.value + 1);

                    paragraph.textContent = "Date: " + date.toISOString().split('T')[0] + " is valid";
                    
                    outputDiv.appendChild(paragraph);
                }
                else{
                    paragraph.textContent = "Date: " + year.value.toString() + "-" + month.value.toString() + "-" + day.value + " is not valid";
                    
                    outputDiv.appendChild(paragraph);
                }

                year.value = "";
                month.value = "";
                day.value = "";
        });
    // }
    // CheckDate();
    // }

    // return function () {
    //     CheckDate();
    // }
};

solve();