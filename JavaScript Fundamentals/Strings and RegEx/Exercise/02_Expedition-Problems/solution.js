function solve() {
  let keyword = document.getElementById("str").value;
  let text = document.getElementById("text").value;

  let latitudePattern = new RegExp(/(north).*?([0-9]{2})[^,]*?\,[^,]*?([0-9]{6})/gi);
  let longitudePattern = new RegExp(/(east).*?([0-9]{2})[^,]*?\,[^,]*?([0-9]{6})/gi);
  let messagePattern = new RegExp(`${keyword}(.*)${keyword}`, "i");

  let lastLattitudeMatch = latitudePattern.exec(text.match(latitudePattern).reverse()[0]);
  
  let lattitude = (+lastLattitudeMatch[2]).toString() + "." + (+lastLattitudeMatch[3]).toString() + " N";
  
  let lastLongtitudeMatch = longitudePattern.exec(text.match(longitudePattern).reverse()[0]);
 
  let longitute = (+lastLongtitudeMatch[2]).toString() + "." + (+lastLongtitudeMatch[3]).toString() + " E";
  
  let message ="Message: " +  messagePattern.exec(text)[1];
 
  let resultSpan = document.getElementById("result");
  
  let firstParagraph = document.createElement("p");
  firstParagraph.textContent = lattitude;

  let secondParagraph = document.createElement("p");
  secondParagraph.textContent = longitute;
  
  let thirdParagraph = document.createElement("p");
  thirdParagraph.textContent = message;

  resultSpan.appendChild(firstParagraph);
  resultSpan.appendChild(secondParagraph);
  resultSpan.appendChild(thirdParagraph);
}