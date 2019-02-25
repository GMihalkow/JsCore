function increment(selector){
    let element = $(selector);
    
    let counter = 0;

    $("<textarea class='counter' value='0' disabled></textarea>").appendTo(element);
    $("<button id='incrementBtn' class='btn'>Increment</button>").appendTo(element);
    $("<button id='addBtn' class='btn'>Add</button>").appendTo(element);
    $("<ul class='results'></ul>").appendTo(element);
    
    let textArea = $(".counter");

    $("#incrementBtn").on("click", () => {
       counter++;
       textArea.attr("value", counter.toString());
       textArea.val(counter);
    });

    $("#addBtn").on("click", () => {
        $("<li>" + textArea.attr("value").toString() + "</li>").appendTo($(".results"));
    });
}