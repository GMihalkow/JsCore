function dart(){
	let scoreBoard = Array.from(document.querySelectorAll("#scoreBoard tr"));
	scoreBoard.shift();

	let greenPoints = parseInt(Array.from(scoreBoard[0].children)[1].textContent.split(" ")[0]);
	let yellowPoints = parseInt(Array.from(scoreBoard[1].children)[1].textContent.split(" ")[0]);
	let orangePoints = parseInt(Array.from(scoreBoard[2].children)[1].textContent.split(" ")[0]);
	let redPoints = parseInt(Array.from(scoreBoard[3].children)[1].textContent.split(" ")[0]);
	let purplePoints = parseInt(Array.from(scoreBoard[4].children)[1].textContent.split(" ")[0]);
	let bluePoints = parseInt(Array.from(scoreBoard[5].children)[1].textContent.split(" ")[0]);

	let turns = Array.from(document.querySelectorAll("#turns p"));
	let current = turns[0];
	let next = turns[1];

	let homePoints = Array.from(document.querySelectorAll("#Home p"))[0];
	let homeField = Array.from(document.querySelectorAll("#Home p"))[1];
	let awayPoints = Array.from(document.querySelectorAll("#Away p"))[0];
	let awayField = Array.from(document.querySelectorAll("#Away p"))[1];


	let isWinnerDecided = false;

	let layers = Array.from(document.querySelectorAll("#playBoard div"));
	layers.forEach((l) => {
		l.addEventListener("click", function(e){
			e.stopPropagation();
			if(!isWinnerDecided){
				let target = e.target;

				let sumToAdd = 0;

				switch(target.id){
					case "firstLayer":{
						sumToAdd = greenPoints;
					}break;
					case "secondLayer":{
						sumToAdd = yellowPoints;
					}break;
					case "thirdLayer":{
						sumToAdd = orangePoints;
					}break;
					case "fourthLayer":{
						sumToAdd = redPoints;
					}break;
					case "fifthLayer":{
						sumToAdd = purplePoints;
					}break;
					case "sixthLayer":{
						sumToAdd = bluePoints;
					}break;
				}

				if(current.textContent === "Turn on Home"){
					homePoints.textContent = parseInt(homePoints.textContent) + sumToAdd;
					current.textContent = "Turn on Away";
					next.textContent = "Next is Home";
				} else {
					awayPoints.textContent = parseInt(awayPoints.textContent) + sumToAdd;
					current.textContent = "Turn on Home";
					next.textContent = "Next is Away";
				}
				
				if(parseInt(homePoints.textContent) >= 100){
					isWinnerDecided = true;
					homeField.style.backgroundColor = "green";
					awayField.style.backgroundColor = "red";
				} else if(parseInt(awayPoints.textContent) >= 100){
					isWinnerDecided = true;
					homeField.style.backgroundColor = "red";
					awayPoints.style.backgroundColor = "green";
				}
			}
		})
	});
}