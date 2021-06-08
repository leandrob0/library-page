let myLibrary = []; //Books array.

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

    removeBookFromLibrary(id) {
        myLibrary.splice(id, 1);
    }

    toggleReadStatus(id) {
        (myLibrary[id].read == 'yes') ? myLibrary[id].read = 'no' : myLibrary[id].read = 'yes';
    }
}

/* 
******************************************

FUNCTIONS TO BE USED

******************************************
*/
function addBookVisual() {
    //CREATE ALL THE DIVS TO BE USED WITH THEIR RESPECTIVES ID
    const newDiv = document.createElement("div");
    const child1 = document.createElement("div");
    const child2 = document.createElement("div");
    const readToggle = document.createElement("div");
    const buttonToggle = document.createElement("button");
    const infoContainer = document.createElement("div");
    newDiv.classList.add('book');
    child1.classList.add('behind');
    child2.classList.add('cover');
    buttonToggle.classList.add('button-toggle');
    newDiv.setAttribute('data-attribute', (myLibrary.length - 1).toString());
    infoContainer.classList.add('info');

    //CREATE THE TEXTS AND SET THEM
    const title = document.createElement("p");
    title.classList.add('book-title');
    const author = document.createElement("p");
    author.classList.add('book-info');
    const pages = document.createElement("p");
    pages.classList.add('book-info');

    let lenghtLibrary = myLibrary.length - 1;

    title.innerText = '"'+ myLibrary[lenghtLibrary].name + '"';
    author.innerText = myLibrary[lenghtLibrary].author;
    pages.innerText = 'Pages: '+ myLibrary[lenghtLibrary].pages;
    buttonToggle.innerText = "read status";

    //APPEND EVERYTHING
    bookContainer.appendChild(newDiv);
    child2.appendChild(title);
    infoContainer.appendChild(author);
    infoContainer.appendChild(pages);
    child2.appendChild(infoContainer);
    child2.appendChild(buttonToggle);
    newDiv.appendChild(child1);
    newDiv.appendChild(child2);
}

//THE FOLLOWING TWO FUNCTIONS DELETE A NODE AND ITS CHILDS 
//Code from https://stackoverflow.com/questions/32259635/recursively-remove-all-nested-nodes-in-javascript
function clearInner(node) {
    while (node.hasChildNodes()) {
      clear(node.firstChild);
    }
}

function clear(node) {
    while (node.hasChildNodes()) {
      clear(node.firstChild);
    }
    node.parentNode.removeChild(node);
    console.log(node, "clear");
}

/*
******************************************

EVENTS LISTENERS HANDLERS 

******************************************
*/

//ADD BOOK EVEN LISTENER
const myBooks = new Book("default","default",0,"--");
const bookContainer = document.querySelector("#library");
const buttonAdd = document.querySelector("#add");
const buttonOutOfForm = document.querySelector("#close-button");
const form = document.querySelector("#myForm");
const formSubmit = document.querySelector("input[type='button']");

buttonAdd.addEventListener('click', ()=> {
    form.style.display = "block";
    bookContainer.classList.add("library-blur");
});

formSubmit.addEventListener('click', () => {
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;

    if(title === "" || author === "" || pages === "") {
        alert("not valid inputs");
        return false;
    }

    myBooks.addBookToLibrary(title, author, pages, '');
    addBookVisual();

    form.style.display = "none";
    bookContainer.classList.remove("library-blur");

    //ADD THE READ BUTTON FUNCTIONALITY
    const buttonsChangeStatus = document.getElementsByClassName("button-toggle");
    let arrayButtons = Array.from(buttonsChangeStatus);
    let buttonToAdd = arrayButtons[myLibrary.length - 1]; //GETS THE LAST BUTTON ADDED

    buttonToAdd.addEventListener("click", () => {
        let idOfTheBook = buttonToAdd.parentNode.parentNode.getAttribute("data-attribute");
        console.log(idOfTheBook);
        if(buttonToAdd.innerText === "Not read" || buttonToAdd.innerText === "read status") 
        {
            buttonToAdd.style.backgroundColor = "#C2FF52";
            myLibrary[idOfTheBook].read == "yes";
            buttonToAdd.innerText = "Read";
        } else {
            buttonToAdd.style.backgroundColor = "#FF4F25";
            buttonToAdd.innerText = "Not read";
            myLibrary[idOfTheBook].read == "no";
        }
    });
});

buttonOutOfForm.addEventListener("click", () => {
    form.style.display = "none";
    bookContainer.classList.remove("library-blur");
});

//REMOVE BOOK EVENT LISTENER
const buttonRemove = document.querySelector("#toggle");
let toggle = true;

function removeShadow() {
    const spine = document.getElementsByClassName("behind");
    Array.from(spine).forEach(element => {
        element.classList.remove("shadow");
    });
}

function deleteElement(event) {
    const nodeBook = event.target.parentNode;
    myBooks.removeBookFromLibrary(event.target.getAttribute('data-attribute'));
    clearInner(nodeBook);
    clear(nodeBook);
}

/*
******************************************
LOGIC FOR THE DELETE BUTTONS VISUALS.
******************************************
*/
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
            element.addEventListener('click', deleteElement);

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
            element.removeEventListener('click', deleteElement);

            //REMOVES EVERY STYLE ADDED BY THE DELETE FUNCTION
            element.innerText = "";
            element.classList.remove("grow");
            element.style.backgroundColor = 'rgb(51, 40, 40)';
        });
        toggle = true;
    }
});