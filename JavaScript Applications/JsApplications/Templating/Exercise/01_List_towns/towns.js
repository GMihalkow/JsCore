function attachEvents(){
    let rootElement = $("#root");

    let loadBtn = $("#btnLoadTowns");
    loadBtn.on("click", function(){
        let towns = $("#towns").val().split(", ").map((el) => {
            return { name: el };
        });

        let template = $("#towns-template").html();
        let compiledTemplate = Handlebars.compile(template);
        let renderedHtml = compiledTemplate({towns});

        rootElement.append(renderedHtml);
    });
}

