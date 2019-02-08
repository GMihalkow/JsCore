function solve(inputMatrix){
    let ATM = [];

    Array.from(inputMatrix).forEach((arrElement) => {
        if(arrElement.length > 2){
            ATM = insert(arrElement, ATM);
        } else if(arrElement.length === 2){
            let resultObj = withdraw(arrElement);
            console.log(resultObj.resultMsg);
            ATM = resultObj.resultATM;
        } else {
            report(arrElement[0]);
        }
    });

    function report(banknote){
        let tempATM = ATM.slice(0);

        let banknotesCount = 0;
        Array.from(tempATM).forEach((num) => {
            if(num === banknote){
                banknotesCount++;
            }
        });

        console.log("Service Report: Banknotes from " + banknote.toString() + "$: " + banknotesCount.toString() + ".");
    }

    function insert(arr, ATM){
        let totalMoneyInserted = 0;
        let tempATM = ATM.slice(0);

        Array.from(arr).forEach((amount) => {
            tempATM.push(parseInt(amount));
            totalMoneyInserted += parseInt(amount);
        });

        let totalATMMoney = Array.from(tempATM).reduce((a, b) => a + b, 0);

        console.log("Service Report: " + totalMoneyInserted.toString() + "$ inserted. Current balance: " + totalATMMoney.toString() + "$.");

        return tempATM;
    }

    function withdraw(arr){
        let currentBalance = parseInt(arr[0]);
        let moneyToWithdraw = parseInt(arr[1]);

        let resultObj = {};

        if(currentBalance < moneyToWithdraw){
            resultObj.resultATM = ATM.slice(0);
            resultObj.resultMsg = ("Not enough money in your account. Account balance: " + currentBalance.toString() + "$.");

            return resultObj;
        } 

        let totalATMMoney = Array.from(ATM).reduce((a, b) => a + b, 0);

        if(totalATMMoney < moneyToWithdraw){
            resultObj.resultATM = ATM.slice(0);
            resultObj.resultMsg = ("ATM machine is out of order!");
            
            return resultObj;
        }

        let tempATM = ATM.slice(0);

        let widthrawnedAmount = 0;

        tempATM = Array.from(tempATM)
        .sort((a,b) => b - a)
        .map((num) => {
            if((widthrawnedAmount + num) <= moneyToWithdraw){
                widthrawnedAmount += num;
            } else {
                return num;
            }
        }).filter(x => x);

        resultObj.resultATM = tempATM;
        resultObj.resultMsg = ("You get " + moneyToWithdraw.toString() + "$. Account balance: " + (currentBalance - moneyToWithdraw)) + "$. Thank you!";

        return resultObj;
    }

}

solve([
    [20, 5, 100, 20, 1],
    [457, 25],
    [1],
    [10, 10, 5, 20, 50, 20, 10, 5, 2, 100, 20],
    [20, 85],
    [5000, 4500],
])