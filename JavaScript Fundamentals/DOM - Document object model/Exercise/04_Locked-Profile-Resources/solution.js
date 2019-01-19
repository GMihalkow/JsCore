function solve() {
   let buttons = document.getElementsByTagName("button");

   let user1LockBtn = document.getElementsByName("user1Locked")[0];
   let user1UnlockBtn = document.getElementsByName("user1Locked")[1];
   
   user1UnlockBtn.addEventListener("click", function(){
      user1LockBtn.removeAttribute("checked");
      user1UnlockBtn.setAttribute("checked", "");
   });

   user1LockBtn.addEventListener("click", function(){
      user1UnlockBtn.removeAttribute("checked");
      user1LockBtn.setAttribute("checked", "");
   });

   let user1HiddenInfo = document.getElementById("user1HiddenFields");
   let user1Btn = buttons[0];

   user1Btn.addEventListener("click", function(){
      if(user1LockBtn.hasAttribute("checked") == false && user1UnlockBtn.hasAttribute("checked") == true){
         if(user1Btn.textContent == "Show more"){
            user1HiddenInfo.style.display = "block";
            user1Btn.textContent = "Hide it";
         }
         else{
            user1HiddenInfo.style.display = "none";
            user1Btn.textContent = "Show more";
         }
      }
   });

   let user2LockBtn = document.getElementsByName("user2Locked")[0];
   let user2UnlockBtn = document.getElementsByName("user2Locked")[1];

   user2UnlockBtn.addEventListener("click", function(){
      user2LockBtn.removeAttribute("checked");
      user2UnlockBtn.setAttribute("checked", "");
   });

   user2LockBtn.addEventListener("click", function(){
      user2UnlockBtn.removeAttribute("checked");
      user2LockBtn.setAttribute("checked", "");
   });

   let user2HiddenInfo = document.getElementById("user2HiddenFields");
   let user2Btn = buttons[1];
   
   user2Btn.addEventListener("click", function(){
      if(user2LockBtn.hasAttribute("checked") == false && user2UnlockBtn.hasAttribute("checked") == true){
         if(user2Btn.textContent == "Show more"){
            user2HiddenInfo.style.display = "block";
            user2Btn.textContent = "Hide it";
         }
         else{
            user2HiddenInfo.style.display = "none";
            user2Btn.textContent = "Show more";
         }
      }
   });

   let user3LockBtn = document.getElementsByName("user3Locked")[0];
   let user3UnlockBtn = document.getElementsByName("user3Locked")[1];
   
   user3UnlockBtn.addEventListener("click", function(){
      user3LockBtn.removeAttribute("checked");
      user3UnlockBtn.setAttribute("checked", "");
   });

   user3LockBtn.addEventListener("click", function(){
      user3UnlockBtn.removeAttribute("checked");
      user3LockBtn.setAttribute("checked", "");
   });

   let user3HiddenInfo = document.getElementById("user3HiddenFields");
   let user3Btn = buttons[2];
   
   user3Btn.addEventListener("click", function(){
      if(user3LockBtn.hasAttribute("checked") == false && user3UnlockBtn.hasAttribute("checked") == true){
         if(user3Btn.textContent == "Show more"){
            user3HiddenInfo.style.display = "block";
            user3Btn.textContent = "Hide it";
         }
         else{
            user3HiddenInfo.style.display = "none";
            user3Btn.textContent = "Show more";
         }
      }
   });

} 