function loadCommits() {
    // https://api.github.com/repos/<username>/<repository>/commits"
    let username = $("#username").val();
    let repo = $("#repo").val();
    
    let commitsList = $("#commits");

    $.get("https://api.github.com/repos/" + username + "/" + repo + "/commits")
    .then((data) => {
        Array.from(data).forEach((element) => {
            let authorName = element.commit.author.name;
            let commitMessage = element.commit.message;

            let result = authorName + ": " + commitMessage;
        
            commitsList.append("<li>" + result.toString() + "</li");
        })
    })
    .catch((error) => {
        commitsList.html("");
        let result = "Error: " + error.status + " (" + error.statusText + ")";

        commitsList.append("<li>" + result.toString() + "</li");
    });
    
}