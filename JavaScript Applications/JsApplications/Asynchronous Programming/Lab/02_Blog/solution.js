function attachEvents(){
    let posts = $("#posts");
    let comments = $("#post-comments");

    let currentId = "";

    posts.on("change", function(e){
       currentId = e.target.value;
    });

    let loadPostsBtn = $("#btnLoadPosts");
    loadPostsBtn.on("click", function(){
        // https://baas.kinvey.com/appdata/kid_B1K_U76PV/posts
        $.ajax({
            url: 'https://baas.kinvey.com/appdata/kid_B1K_U76PV/posts',
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Basic auth');
            }
        }).then((data) => {
            Array.from(data).forEach((post) => {
                posts.append("<option value='" + post._id + "'>" + post.title + "</option>");
            });
            
            currentId = Array.from(posts[0].children)[posts[0].selectedIndex].value;
        });
    });

    let viewPostBtn = $("#btnViewPost");
    viewPostBtn.on("click", function(){
        $.ajax({
            url: encodeURI('https://baas.kinvey.com/appdata/kid_B1K_U76PV/comments?query={"post_id":"' + currentId + '"}'),
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Basic auth');
            }
        }).then((data) => {
            $.ajax({
                url: encodeURI('https://baas.kinvey.com/appdata/kid_B1K_U76PV/posts/' + currentId),
                type: 'GET',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Basic auth');
                }
            })
            .then((p) => {
                $("#post-title").text(p.title);
                $("#post-body").text(p.body);
            });

            Array.from(data).forEach((com) => {
                comments.append("<li>" + com.text + "</li>");
            });
        });
    });
}