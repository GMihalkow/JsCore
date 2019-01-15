function CountLetterOccurences(text, letter){
    let counter = 0;
    for(i = 0; i < text.length; i++){
        if(text[i].toLowerCase() == letter.toLowerCase()){
            counter++;
        }
    }

    return counter;
}

console.log(CountLetterOccurences("Bulgaria", "b"));