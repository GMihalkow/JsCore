function solve() {
  let inputArr = JSON.parse(document.getElementById("arr").value);
  
  function compareTitles(a, b){
    if(a.title > b.title){
      return 1;
    } else if(a.title === b.title) {
      return 0;
    } else {
      return -1;
    }
  }
  
  function doesGenreExist(bookShelfs, genre){
    let genreExists = Object.keys(bookShelfs)
    .some((key) => {
      if(bookShelfs[key].genre === genre.toString()){
        return true;
      }
    });

    return genreExists;
  }

  let bookShelfs = {};
  Array.from(inputArr).forEach((element) => {
    if(element.includes("->")){
      let splitElement = element.split(" -> ");
      let shelfId = splitElement[0];

      if(bookShelfs[shelfId] === undefined){
        let shelfGenre = splitElement[1];
  
        bookShelfs[shelfId] = { genre: shelfGenre, books: []};
      }
    } else {
      let splitElement = element.split(": ");
      let bookTitle = splitElement[0];

      let bookInfo = splitElement[1].split(", ");
      let bookAuthor = bookInfo[0];
      let bookGenre = bookInfo[1];

      let bookObj = { 
        title: bookTitle,
        author: bookAuthor,
        genre: bookGenre
      };

      let genreExists = doesGenreExist(bookShelfs, bookGenre);
      if(genreExists === true){
        Object.keys(bookShelfs)
          .forEach((key) => {
            if(bookShelfs[key].genre === bookGenre.toString()){
              if(bookShelfs[key].books === undefined){
                bookShelfs[key].books = [];
              }
              bookShelfs[key].books.push(bookObj);
            }
          });
      }
    }
  });

  let sortedShelfs = [];

  Object.keys(bookShelfs)
  .sort((a, b) => {
    return bookShelfs[b].books.length - bookShelfs[a].books.length;
  }).forEach((key) => {
    let shelfObj = { shelfId: key, value: bookShelfs[key] };

    shelfObj.value.books = Array.from(shelfObj.value.books)
    .sort((a, b) => {
      return compareTitles(a, b);
    });

    sortedShelfs.push(shelfObj);
  });

  let resultSpan = document.getElementById("result");

  Array.from(sortedShelfs).forEach((shelf) => {
    let paragraph = document.createElement("p");
    paragraph.innerHTML = shelf.shelfId.toString() + " " + shelf.value.genre.toString() + ": " + shelf.value.books.length.toString();
    resultSpan.appendChild(paragraph);

    Array.from(shelf.value.books).forEach((b) => {
      let bookParagraph = document.createElement("p");

      bookParagraph.innerHTML = "--> " + b.title.toString() + ": " + b.author.toString();

      resultSpan.appendChild(bookParagraph);
    });
  });
}
