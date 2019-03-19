function loadRepos() {
    let xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function(r){
        let res = document.getElementById("res");
        res.textContent = (r.target.response);
    }

    xhr.open("GET", "https://api.github.com/users/testnakov/repos");
    xhr.send();
}