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
    let status = prompt("Have you read the book(yes or no):");
    return status;
}

function addBookVisual() {
    //CREATE ALL THE DIVS TO BE USED WITH THEIR RESPECTIVES ID
    const newDiv = document.createElement("div");
    const child1 = document.createElement("div");
    const child2 = document.createElement("div");
    const infoContainer = document.createElement("div");
    newDiv.classList.add('book');
    child1.classList.add('behind');
    child2.classList.add('cover');
    infoContainer.classList.add('info');

    //CREATE THE TEXTS AND SET THEM
    const title = document.createElement("p");
    title.classList.add('book-title');
    const author = document.createElement("p");
    author.classList.add('book-info');
    const pages = document.createElement("p");
    pages.classList.add('book-info');
    const read = document.createElement("p");
    read.classList.add('book-info');

    let lenghtLibrary = myLibrary.length - 1;

    title.innerText = '"'+ myLibrary[lenghtLibrary].name + '"';
    author.innerText = myLibrary[lenghtLibrary].author;
    pages.innerText = 'Pages: '+ myLibrary[lenghtLibrary].pages;

    (myLibrary[lenghtLibrary].read == "yes") ? read.innerText = "Already read" : read.innerText = "Not read";

    //APPEND EVERYTHING
    bookContainer.appendChild(newDiv);
    child2.appendChild(title);
    infoContainer.appendChild(author);
    infoContainer.appendChild(pages);
    infoContainer.appendChild(read);
    child2.appendChild(infoContainer);
    newDiv.appendChild(child1);
    newDiv.appendChild(child2);
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

//ADD BOOK EVEN LISTENER
const myBooks = new Book("default","default",0,"--");
const bookContainer = document.querySelector("#library");
const buttonAdd = document.querySelector("#add");

buttonAdd.addEventListener('click', ()=> {
    myBooks.addBookToLibrary(askName(), askAuthor(), askPages(), askStatus());
    addBookVisual();
});

//REMOVE BOOK EVENT LISTENER
const buttonRemove = document.querySelector("#toggle");
let toggle = true;

function removeShadow(element) {
    const spine = document.getElementsByClassName("behind");
    Array.from(spine).forEach(element => {
        element.classList.remove("shadow");
    });
}

buttonRemove.addEventListener('click', () => {
    const spine = document.getElementsByClassName("behind");
    if(Array.from(spine).length == 0) {
        return;
    }
    if(toggle) {
        Array.from(spine).forEach(element => {

            //ADDS THE SHADOW WHEN THE MOUSE ENTERS THE DIV
            element.addEventListener('mouseenter', () => {
                element.classList.add("shadow");
            });
            element.addEventListener('mouseleave', removeShadow);

            //CHANGES THE SPINE COLOR AND ADDS THE TEXT
            element.style.backgroundColor = 'WHITE';
            element.classList.add("grow");
            element.innerText = "DELETE";
        });
        toggle = false;
    } else {
        Array.from(spine).forEach(element => {
            //REMOVES THE SHADOW WHEN THE TOGGLE BUTTON IS OFF
            element.addEventListener('mouseenter', () => {
                element.classList.remove("shadow");
            });
            element.removeEventListener('mouseleave', removeShadow);

            //REMOVES EVERY STYLE ADDED BY THE DELETE FUNCTION
            element.innerText = "";
            element.classList.remove("grow");
            element.style.backgroundColor = 'rgb(51, 40, 40)';
        });
        toggle = true;
    }
});
