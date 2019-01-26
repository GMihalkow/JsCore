function solve() {
  let resultSpan = document.querySelector("#result");

  let arr = JSON.parse(document.querySelector("#arr").value);

  let reversedArr = arr.slice(0);
  
  let tempArr = Array.from(reversedArr).map((el) => {
    let array = [];

    let word = el;

    word = word.split("");
    word = word.reverse();
    word[0] = word[0].toUpperCase();
    word = word.join("");

    array.push(word);

    return array;
  });

  resultSpan.textContent = tempArr.join(" ");
}