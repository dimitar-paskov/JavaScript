class BookCollection {
    constructor(shelfGenre, room, shelfCapacity ){
        this.shelfGenre = shelfGenre;
        this.room = room;
        this.shelfCapacity = shelfCapacity;
        this.shelf = [];

    }
    
    get room(){
        return this._room;
    }
    set room(room){
        let allowedRooms = ['livingRoom', 'bedRoom', 'closet'];
        if (allowedRooms.includes(room)){
            this._room = room;
        }else{
            throw new Error(`Cannot have book shelf in ${room}`);
        }
    }

    get shelfCondition(){
        return this.shelfCapacity - this.shelf.length;
    }

    addBook(bookName, bookAuthor, genre){
        let book = {bookName, bookAuthor, genre};
        if (this.shelf.length < this.shelfCapacity){
            this.shelf.push(book);
        } else{
            this.shelf.shift();
            this.shelf.push(book);
        }

        this.shelf.sort((a,b)=> {
             return a.bookAuthor.localeCompare( b.bookAuthor);
        })

        return this;
    }

    throwAwayBook(bookName){
        this.shelf = this.shelf.filter(x=>{
            return x.bookName!==bookName;
        });
        return this;
    }

    showBooks(genre){
        let answer = `Results for search "${genre}":`;
        this.shelf.filter(x=>{
            return x.genre === genre;
        }).forEach(x=>{
            answer += `\n\uD83D\uDCD6 ${x.bookAuthor} - "${x.bookName}"`
        });

        return answer;

    }

    toString(){
        if (this.shelf.length === 0){
            return "It's an empty shelf";
        } else{
            let answer = `"${this.shelfGenre}" shelf in ${this.room} contains:`;
            this.shelf.forEach(x=>{
                answer += `\n\uD83D\uDCD6 "${x.bookName}" - ${x.bookAuthor}`
            });
            return answer;

        }

    }

}

// function Book(bookName, bookAuthor, genre = '') {
//     this.bookName = bookName;
//     this.bookAuthor = bookAuthor;
//     this.genre = genre;
// }



// let shlf4e = new BookCollection('Programming', 'livingRoom', 5);
// console.log(shlf4e);
let livingRoom = new BookCollection("Programming", "livingRoom", 5);
console.log(livingRoom.toString());
livingRoom.addBook("Introduction to Programming with C#", "Evetlin Nakov", 'music')
    .addBook("Introduction to Programming with Java", "Fvetlin Nakov")
    .addBook("Programming1 for .NET Framework", "Cvetlin Nakov")
    .addBook("Programming2 for .NET Framework", "Bvetlin Nakov")
    .addBook("Programming3 for .NET Framework", "Dvetlin Nakov")
    .addBook("A for .NET Framework", "Avetlin Nakov")
    .throwAwayBook('Introduction to Programming with Java')
console.log(livingRoom.toString());

// let bedRoom = new BookCollection('Mixed', 'bedRoom', 5);
// bedRoom.addBook("John Adams", "David McCullough", "history");
// bedRoom.addBook("The Guns of August", "Cuentos para pensar", "history");
// bedRoom.addBook("Atlas of Remote Islands", "Judith Schalansky");
// bedRoom.addBook("Paddle-to-the-Sea", "Holling Clancy Holling");
// console.log("Shelf's capacity: " + bedRoom.shelfCondition);
// console.log(bedRoom.showBooks("history"));