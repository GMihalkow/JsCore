function attachEvents() {
    $("#commands button").on("click", function (e) {
        let target = e.target;
        $(".selectedBtn").addClass("btn");
        $(".selectedBtn").removeClass("selectedBtn");

        if (target.textContent === "Create") {
            target.classList.remove("btn");
            target.classList.add("selectedBtn");

            $("#createBookDiv").attr("style", "display:block");
            $("#loadBooksDiv").attr("style", "display:none");
            $("#deleteBookDiv").attr("style", "display:none");
            $("#updateBookDiv").attr("style", "display:none");
        } else if (target.textContent === "Delete") {
            target.classList.remove("btn");
            target.classList.add("selectedBtn");

            $("#loadBooksDiv").attr("style", "display:none");
            $("#createBookDiv").attr("style", "display:none");
            $("#deleteBookDiv").attr("style", "display:block");
            $("#updateBookDiv").attr("style", "display:none");
        } else if (target.textContent === "Load") {
            target.classList.remove("btn");
            target.classList.add("selectedBtn");

            $("#loadBooksDiv").attr("style", "display:block");
            $("#deleteBookDiv").attr("style", "display:none");
            $("#updateBookDiv").attr("style", "display:none");
            $("#createBookDiv").attr("style", "display:none");
        } else if (target.textContent === "Update") {
            target.classList.remove("btn");
            target.classList.add("selectedBtn");

            $("#updateBookDiv").attr("style", "display:block");
            $("#deleteBookDiv").attr("style", "display:none");
            $("#createBookDiv").attr("style", "display:none");
            $("#loadBooksDiv").attr("style", "display:none");
        }
    });

    //Add book functionality
    let addBtn = $("#addBtn");
    addBtn.on("click", function () {
        let actionsBox = $("#actionsBox");

        let title = $("#addForm .title").val();
        let author = $("#addForm .author").val();
        let isbn = $("#addForm .isbn").val();
        let tags = $("#addForm .tags").val().split(", ");

        if (title.length === 0 || author.length === 0 || isbn.length === 0 || tags.length === 0) {
            actionsBox.removeClass("text-success");
            actionsBox.addClass("text-danger");
            actionsBox.text("Error! Parameters length must be larger than zero.");
        } else {
            $.ajax({
                url: 'https://baas.kinvey.com/appdata/kid_B1K_U76PV/books',
                type: 'POST',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Basic Secret");
                },
                data: { title, author, isbn, tags }
            });
            actionsBox.removeClass("text-danger");
            actionsBox.addClass("text-success");

            actionsBox.text(title + " successfully created!");
        }

        $("#addForm .title").val("");
        $("#addForm .author").val("");
        $("#addForm .isbn").val("");
        $("#addForm .tags").val("");
    });

    //Load books functionality
    let loadBtn = $("#loadBtn");
    loadBtn.on("click", function () {
        $.ajax({
            url: 'https://baas.kinvey.com/appdata/kid_B1K_U76PV/books',
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic Secret");
            }
        }).then((data) => {
            let booksElement = $("#books");
            booksElement.html("");

            if (Array.from(data).length === 0) {
                booksElement.html("No books were found.");
            } else {
                booksElement.html(JSON.stringify(data, null, 2));
            }
        });
    });

    //Delete book functionality
    let deleteBtn = $("#deleteBtn");
    deleteBtn.on("click", function () {
        let bookId = $("#deleteForm .bookId").val();
        let deleteBox = $("#deleteActionsBox");
        $.ajax({
            url: 'https://baas.kinvey.com/appdata/kid_B1K_U76PV/books/' + bookId,
            type: 'DELETE',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic Secret");
            }
        }).then(() => {
            deleteBox.removeClass("text-danger");
            deleteBox.addClass("text-success");
            deleteBox.text("Book deleted successfully.");
        }).catch(() => {
            deleteBox.addClass("text-danger");
            deleteBox.removeClass("text-success");
            deleteBox.text("Invalid book id.");
        });

        $("#deleteForm .bookId").val("");
    });

    //Update book functionality
    let updateBtn = $("#updateBtn");
    updateBtn.on("click", function () {
        let bookId = $("#updateForm .bookId").val();
        let bookTitle = $("#updateForm .title").val();
        let bookAuthor = $("#updateForm .author").val();
        let bookIsbn = $("#updateForm .isbn").val();
        let bookTags = $("#updateForm .tags").val().split(", ").filter((e) => e.length !== 0);
        let bookExists = true;

        $.ajax({
            url: 'https://baas.kinvey.com/appdata/kid_B1K_U76PV/books',
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic Secret");
            }
        }).then((data) => {
            if(!(data.some((b) => b._id === bookId))){
                bookExists = false;
            }
            let updateBox = $("#updateActionsBox");
        if(bookExists){
            if (bookTitle.length === 0 || bookAuthor.length === 0 || bookIsbn.length === 0) {
                updateBox.removeClass("text-success");
                updateBox.addClass("text-danger");
                updateBox.text("Error! Parameters length must be larger than zero.");
            } else {
                $.ajax({
                    url: 'https://baas.kinvey.com/appdata/kid_B1K_U76PV/books/' + bookId,
                    type: 'PUT',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Basic Secret");
                    },
                    data: {
                        "title": bookTitle,
                        "author": bookAuthor,
                        "isbn": bookIsbn,
                        "tags": bookTags
                    }
                }).then(() => {
                    updateBox.removeClass("text-danger");
                    updateBox.addClass("text-success");
                    updateBox.text("Book successfuly updated.");
                });
            }
        } else {
            updateBox.addClass("text-danger");
            updateBox.removeClass("text-success");
            updateBox.text("Invalid book Id.");
        }
        });

        $("#updateForm .bookId").val("");
        $("#updateForm .title").val("");
        $("#updateForm .tags").val("");
        $("#updateForm .author").val("");
        $("#updateForm .isbn").val("");
    });
}