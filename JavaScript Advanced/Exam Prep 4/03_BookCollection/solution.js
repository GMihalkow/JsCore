class BookCollection {
    constructor(shelfGenre, room, shelfCapacity){
        let validRooms = [ "livingRoom", "bedRoom", "closet" ];
        
        if(validRooms.includes(room)){
            this.shelfGenre = shelfGenre;
            this.room = room;
            this.shelf = [];
            this.shelfCapacity = shelfCapacity;
        } else {
            throw new Error("Cannot have book shelf in " + room.toString());
        }
    }

    get shelfCondition(){
        let freeSlots = this.shelfCapacity - this.shelf.length;

        return freeSlots;
    }

    compareAuthorNames(firstAuthor, secondAuthor){
        if(firstAuthor > secondAuthor){
            return 1;
        } else if(firstAuthor === secondAuthor){
            return 0;
        } else {
            return -1;
        }
    }

    addBook(bookName, bookAuthor, genre){
        let book = { bookName, bookAuthor };
        if(genre !== undefined){
            book.genre = genre;
        }
        
        if(this.shelfCondition === 0 && this.shelfCapacity > 0){
            this.shelf.shift();            
            this.shelf.push(book);
        } else if(this.shelfCondition > 0){
            this.shelf.push(book);
        }
        
        this.shelf = Array.from(this.shelf).sort((a, b) => this.compareAuthorNames(a.bookAuthor, b.bookAuthor));
    }

    throwAwayBook(bookName){
        let bookIndex = Array.from(this.shelf).findIndex((b) => b.bookName === bookName);
        
        if(bookIndex >= 0){
            this.shelf[bookIndex] = undefined;
        }

        this.shelf = Array.from(this.shelf).filter((b) => {
            if(b === undefined){
                return false;
            }
            return true;
        });
    }

    showBooks(genre){
        let booksFromGenre = Array.from(this.shelf).filter((b) => {
            if(b.genre !== undefined){       
                if(b.genre.toLowerCase() === genre.toLowerCase()){
                    return true;
                }
            }
            return false;
        });
        
        let result = 'Results for search "' + genre.toString() + '":\n';
            
        Array.from(booksFromGenre).forEach((b) => {
            result += '\uD83D\uDCD6 ' + b.bookAuthor.toString() + ' - "' + b.bookName.toString() + '"\n';
        });

        return result.trim();
    }

    toString(){
        if(this.shelfCondition === this.shelfCapacity){
            return "It's an empty shelf";
        }

        let result = '"' + this.shelfGenre.toString() + '"' + " shelf in " + this.room.toString() + " contains:\n";
        
        Array.from(this.shelf).forEach((b) => {
            result += '\uD83D\uDCD6 "' + b.bookName.toString() + '" - ' + b.bookAuthor.toString() + "\n";
        });

        return result.trim();
    }
}

let bedRoom = new BookCollection('Mixed', 'bedRoom', 1);
// bedRoom.addBook("test", "Pesho", "Fiction");
// bedRoom.addBook("test1", "Petar");
// bedRoom.addBook("test2", "Ivan");
// bedRoom.addBook("test3", "Biser");
// bedRoom.addBook("test4", "Dimitar");
bedRoom.addBook("test5", "Gosho");
bedRoom.throwAwayBook("test5");
console.log(bedRoom.shelfCondition);
