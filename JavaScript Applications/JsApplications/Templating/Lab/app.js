$(() => {
    // Contacts list element
    let contactsList = $("#list > .content");

    // Actual partial content
    let contactPartialSource = '<div class=\"contact\">' +
                    '<span class=\"avatar small\">&#9787;</span>' + 
                                        //using the full name helper
                    '<span class=\"title\">{{fullname firstName lastName}}</span>' +
                 '</div>';

    // Creating the partial
    Handlebars.registerPartial("contact", contactPartialSource);

    // Creating the helper
    Handlebars.registerHelper("fullname", function(a, b){
        return new Handlebars.SafeString(a + " " + b);
    });

    // Template source
    let actualSource = $("#contact-template").html();
    // Compiling the template
    let compiledTemplate = Handlebars.compile(actualSource);
    // Rendering the result of the template
    let renderedResult = compiledTemplate(data);

    // Appending the result to the list
    contactsList.append(renderedResult);

    let contactDetailsPartialSource = 
    '<div class="info">' +
        '<div class="col">' +
            '<span class="avatar">&#9787;</span>' +
        '</div>' +
        '<div class="col">' +
            '<span class="name">{{firstName}}</span>' +
            '<span class="name">{{lastName}}</span>' +
        '</div>' +
    '</div>' +
    '<div class="info">' +
        '<span class="info-line">&phone; {{phone}}</span>' +
        '<span class="info-line">&#9993; {{email}}</span>' +
    '</div>';

    let detailsElement = $("#details > .content");
    Handlebars.registerPartial("contactDetails", contactDetailsPartialSource);
    $(".contact").on("click", function(e){
        let target = $(e.target);
        
        let names = (target).children()[1].textContent;

        let contact = Array.from(data.data).find((person) => {
            let tempNames = person.firstName + " " + person.lastName;

            return tempNames === names;
        });

        // Template source
        let detailsSource = $("#details-template").html();
        // Compiling the template
        let detailsCompiledTemplate = Handlebars.compile(detailsSource);
        // Rendering the result of the template
        let renderedResult = detailsCompiledTemplate(contact);

        // Appending the result to the list
        detailsElement.html(renderedResult);
    });
});