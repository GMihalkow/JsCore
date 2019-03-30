function attachEvents(){
    let textArea = $("#messages");

    function loadMessages() {
        $.get("https://testapp-3b30c.firebaseio.com/messenger.json", function(msgs){
            Object.keys(msgs).sort((a, b) => b.timestamp - a.timestamp).forEach((m) => {
                let message = msgs[m];
                let author = message.author;
                let content = message.content;

                let currentText = textArea.text();
                currentText += author + ": " + content + "\n";

                textArea.text(currentText);
            });
        });
    }
    
    $("#refresh").on("click", function(){
        textArea.text("");
        loadMessages();
    });

    loadMessages();

    $("#submit").on("click", function(){
        let authorName = $("#author").val();
        let authorContent = $("#content").val();
        let timeStamp = Date.now();

        let msgObj = {
            author: authorName,
            content: authorContent,
            timestamp: timeStamp
        }

        let url = "https://testapp-3b30c.firebaseio.com/messenger.json";

        $.ajax({
            type:"POST",
            url: url,
            data: JSON.stringify(msgObj),
            success: () => console.log("success!")
        });

        $("#author").val("");
        $("#content").val("");
    });
}