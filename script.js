let myLibrary = [];

function askName() {
    let name = prompt("Name of the book:");
    return name;
}
function askAuthor() {
    let author = prompt("Author of the book:");
    return author;
}
function askPages() {
    let pages = prompt("Pages of the book:");
    return pages;
}
function askStatus() {
    let status = prompt("Have you read the book:");
    return status;
}

class Book {
    constructor(name, author, pages, read) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    addBookToLibrary(name, author, pages, read) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.read = read;

        myLibrary.push({name, author, pages, read});
    }
}


const myBooks = new Book("default","default",0,"--");
const bookContainer = document.querySelector("#library");
const buttonAdd = document.querySelector("#add");

buttonAdd.addEventListener('click', ()=> {
    const newDiv = document.createElement("div");
    newDiv.classList.add("book");

    myBooks.addBookToLibrary(askName(), askAuthor(), askPages(), askStatus());

    bookContainer.appendChild(newDiv);
});

console.log(myLibrary);
