function solve(){
   let resultSpan = document.querySelector("span");

   let finishedCount = 0;

   let googleRobot = document.getElementById("google");
   let googleRobotTravelledDistance = 0;

   let softuniRobot = document.getElementById("softuni");
   let softuniRobotTravelledDistance = 0;

   let facebookRobot = document.getElementById("facebook");
   let facebookRobotTravelledDistance = 0;

   let inputFields = document.querySelectorAll("input");

   let robotNameInput = inputFields[0];
   let distanceInput = inputFields[1];

   let doItBtn = document.querySelector("button");
   doItBtn.addEventListener("click", function() {
      if(distanceInput.value.split(" ").length == 2){
         
         let action = distanceInput.value.split(" ")[0].toLowerCase().toString();
         let distance = +distanceInput.value.split(" ")[1];
         // if(distance == 50 || distance == 30){
            
            switch(robotNameInput.value){
               case"softuni":{
                     if(distance > 0){
                        
                        if(action == "forward"){

                           if(distance + softuniRobotTravelledDistance <= 80){
                              softuniRobot.style.marginLeft = distance + softuniRobotTravelledDistance + "%";
                              softuniRobotTravelledDistance += distance;

                              
                              if(softuniRobotTravelledDistance >= 80){
                              
                                 if(finishedCount == 0){
                                    resultSpan.textContent = "SOFTUNI WIN THE RACE!"
                                 }
                                 
                                 if(finishedCount == 1){
                                    resultSpan.textContent = "SOFTUNI FINISHED 2"
                                 }
                                 
                                 if(finishedCount == 2){
                                    resultSpan.textContent = "SOFTUNI FINISHED 3"
                                 }
                                 
                                 finishedCount++;
                              }
                              else{
                                 resultSpan.textContent = "softuni move " + distance + " forward";
                              }
                           }
                           else{
                              resultSpan.textContent = "softuni can't move so forward"
                           }

                           
                        }

                        if(action == "backward"){
                           if(softuniRobotTravelledDistance < 80){
                              
                              if(softuniRobotTravelledDistance - distance >= 0){

                                 softuniRobot.style.marginLeft = softuniRobotTravelledDistance  - distance + "%";
                                 softuniRobotTravelledDistance -= distance;

                                 resultSpan.textContent = "softuni was distracted and he got behind with " + distance + " meters";
                              }
                              else{
                                 resultSpan.textContent = "softuni can't move so backward"
                              }
                           }
                        }

                        
                     }
               }break;

               case"facebook":{
                     if(distance > 0){
                        
                        if(action == "forward"){


                           if(distance + facebookRobotTravelledDistance <= 80){
                              facebookRobot.style.marginLeft = distance + facebookRobotTravelledDistance + "%";
                              facebookRobotTravelledDistance += distance;

                              if(facebookRobotTravelledDistance >= 80){
                                 
                                 if(finishedCount == 0){
                                    resultSpan.textContent = "FACEBOOK WIN THE RACE!"
                                 }
                                 
                                 if(finishedCount == 1){
                                    resultSpan.textContent = "FACEBOOK FINISHED 2"
                                 }
                                 
                                 if(finishedCount == 2){
                                    resultSpan.textContent = "FACEBOOK FINISHED 3"
                                 }
                                 
                                 finishedCount++;
                              }
                              else{
                                 resultSpan.textContent = "facebook move " + distance + " forward";
                              }
                           }
                           else{
                              resultSpan.textContent = "facebook can't move so forward"
                           }

                          
                        }

                        if(action == "backward"){
                           if(facebookRobotTravelledDistance < 80){
                              if(facebookRobotTravelledDistance - distance >= 0){

                                 facebookRobot.style.marginLeft = facebookRobotTravelledDistance  - distance + "%";
                                 facebookRobotTravelledDistance -= distance;

                                 resultSpan.textContent = "facebook was distracted and he got behind with " + distance + " meters";
                                 
                              }
                              else{
                                 resultSpan.textContent = "facebook can't move so backward"
                              }
                           }
                        }

                     }
               }break;

               case"google":{
                     if(distance > 0){
                        
                        if(action == "forward"){
                           console.log(googleRobotTravelledDistance);
                           if(distance + googleRobotTravelledDistance <= 80){
                              console.log(googleRobotTravelledDistance);
                              googleRobot.style.marginLeft = distance + googleRobotTravelledDistance + "%";
                              googleRobotTravelledDistance += distance;
                              console.log(googleRobotTravelledDistance);
                              if(googleRobotTravelledDistance >= 80){
                           
                                 if(finishedCount == 0){
                                    resultSpan.textContent = "GOOGLE WIN THE RACE!"
                                 }
                                 
                                 if(finishedCount == 1){
                                    resultSpan.textContent = "GOOGLE FINISHED 2"
                                 }
                                 
                                 if(finishedCount == 2){
                                    resultSpan.textContent = "GOOGLE FINISHED 3"
                                 }
                                 
                                 finishedCount++;
                              }
                              else{
                                 resultSpan.textContent = "google move " + distance + " forward";
                              }
                           }
                           else{
                              resultSpan.textContent = "google can't move so forward"
                           }
                        }

                        if(action == "backward"){
                           if(googleRobotTravelledDistance < 80){
                              
                              if(googleRobotTravelledDistance - distance >= 0){

                                 googleRobot.style.marginLeft = googleRobotTravelledDistance - distance + "%";
                                 googleRobotTravelledDistance -= distance;

                                 resultSpan.textContent = "google was distracted and he got behind with " + distance + " meters";
                                 
                              }
                              else{
                                 resultSpan.textContent = "google can't move so backward"
                              }
                           }
                        }

                     
                     }
               }break;
            }

         }   
      // }
   });
}