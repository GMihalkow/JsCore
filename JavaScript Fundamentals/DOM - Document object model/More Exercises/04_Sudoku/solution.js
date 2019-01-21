function solve(){
  let inputs = document.querySelectorAll("input");
  let buttons = document.querySelectorAll("button");
  let table = document.querySelector("table");
  let targetDiv = document.querySelector("#check > p");

  let matrix = new Array(3);

  for(i=0; i<3; i++){
    matrix[i] = new Array(3);
  }

  function GetNumbers(){
    let counter = 0;
    for(i=0; i<3; i++){
      for(index=0; index<3; index++){
        matrix[i][index] = inputs[counter].value;
        counter++;
      }
    }
  }

  function ClearMatrix(){
    let counter = 0;
    for(i=0; i<3; i++){
      for(index=0; index<3; index++){
        matrix[i][index] = "";
        inputs[counter].value = "";
        counter++;
      }
    }
  }

  let checkBtn = buttons[0];
  checkBtn.addEventListener("click", function(){
    GetNumbers();

    let invalidNumbers = 0;
    for(i=0; i<3; i++){
      for(index=0; index<3; index++){
        if(+matrix[i][index] > 9 || +matrix[i][index] < 1){
          invalidNumbers++;
        }

        if(matrix[i+1]){
          if(matrix[i][index] === matrix[i+1][index]){
            invalidNumbers++;
          }
        }
        if(matrix[i+2]){
          if(matrix[i][index] === matrix[i+2][index]){
            invalidNumbers++;
          }
        }

        if(matrix[i-1]){
          if(matrix[i][index] === matrix[i-1][index]){
            invalidNumbers++;
          }
        }
        if(matrix[i-2]){
          if(matrix[i][index] === matrix[i-1][index]){
            invalidNumbers++;
          }
        }

        if(matrix[i][index+1]){
          if(matrix[i][index] === matrix[i][index+1]){
            invalidNumbers++;
          }
        }
        if(matrix[i][index+2]){
          if(matrix[i][index] === matrix[i][index+2]){
            invalidNumbers++;
          } 
        }

        if(matrix[i][index-1]){
          if(matrix[i][index] === matrix[i][index-1]){
            invalidNumbers++;
          }
        }
        
        if(matrix[i][index-2]){
          if(matrix[i][index] === matrix[i][index-2]){
            invalidNumbers++;
          }
        }
      }
    }

    if(invalidNumbers === 0){
      table.style.border = "2px solid green";
      targetDiv.textContent = "You solve it! Congratulations!";
      targetDiv.parentElement.style.color = "green";
    }
    else{
      table.style.border = "2px solid darkred";
      targetDiv.textContent = "NOP! You are not done yet...";
      targetDiv.parentElement.style.color = "darkred";
    }
  });

  
  let clearBtn = buttons[1];
  clearBtn.addEventListener("click", function(){
    table.style.border = "none";
    
    ClearMatrix();
    
    targetDiv.parentElement.style.color = "";
    targetDiv.textContent = "";
  })
}