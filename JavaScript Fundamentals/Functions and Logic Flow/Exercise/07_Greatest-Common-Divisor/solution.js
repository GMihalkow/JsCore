   function greatestCD() {

      let resultSpan = document.getElementById("result");

      let firstNumber = document.getElementById("num1").value;
      let secondNumber = document.getElementById("num2").value;

      let gcd = 0;
      if(+firstNumber !== 0 && +secondNumber !== 0)
      {
         if(+firstNumber > +secondNumber){
            let divisor = +firstNumber;
            let secondDivisor = +secondNumber;
            while(divisor % secondDivisor !== 0){
               let remainder = divisor % secondDivisor;
               divisor = secondDivisor;
               secondDivisor = remainder;
               gcd = remainder;

               console.log("remainder = " + remainder);
               console.log("divisor = " + divisor);
               console.log("secondDivisor = " + secondDivisor);
            }

            if(gcd === 0){
               gcd = secondNumber;
            }

            resultSpan.innerHTML = gcd;
         }
         else{
            let divisor = +secondNumber;
            let secondDivisor = +firstNumber;
            while(divisor % secondDivisor !== 0){
               let remainder = divisor % secondDivisor;
               divisor = secondDivisor;
               secondDivisor = +remainder;
               gcd = remainder;

               console.log("remainder = " + remainder);
               console.log("divisor = " + divisor);
               console.log("secondDivisor = " + secondDivisor);
            }

            if(gcd === 0){
               gcd = firstNumber;
            }
            resultSpan.innerHTML = gcd;
         }
      }
      else{
         resultSpan.innerHTML = "0";
      }
         document.getElementById("num1").value = "";
         document.getElementById("num2").value = "";
      // }
   }