function solve() {
	let textAreas = document.getElementsByTagName("textarea");
	let buttons = document.getElementsByTagName("button");

	let decodeTextArea = textAreas[1];
	let decodeBtn = buttons[1];
	decodeBtn.addEventListener("click", function(){
		let message = decodeTextArea.value;
		let decodedMessage = "";
		for(i=0; i<message.length; i++){
			decodedMessage += String.fromCharCode(message.charCodeAt(i)-1);
		}
		
		decodeTextArea.value = decodedMessage;
	});

	let encodeTextArea = textAreas[0];
	let encodeBtn = buttons[0];
	encodeBtn.addEventListener("click", function(){
		let message = encodeTextArea.value;
		let encodedMessage = "";
		for(i=0; i<message.length; i++){
			encodedMessage += String.fromCharCode(message.charCodeAt(i)+1);
		}
		encodeTextArea.value = "";
		decodeTextArea.value = encodedMessage;
	});

}