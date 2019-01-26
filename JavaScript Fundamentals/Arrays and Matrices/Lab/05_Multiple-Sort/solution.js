function solve() {
  let resultDiv = document.querySelector("#result");

  let arr = JSON.parse(document.querySelector("#arr").value);

  let ascendingOrderedArr = arr.sort((a, b) => {return a-b;});
  let firstDiv = document.createElement("div");
  firstDiv.textContent = ascendingOrderedArr.join(", ");

  let alphabeticallyOrderedArr = arr.sort();
  let secondDiv = document.createElement("div");
  secondDiv.textContent = alphabeticallyOrderedArr.join(", ");
  
  resultDiv.appendChild(firstDiv);
  resultDiv.appendChild(secondDiv);
}