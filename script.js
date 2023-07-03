const bookContainer = document.querySelector('.books');
const form = document.getElementById('add-form');
const submitButton = document.getElementById('submit-button');
const totalBooksDiv = document.getElementById('total-books');
const totalReadDiv = document.getElementById('total-read');
const totalPagesReadDiv = document.getElementById('total-pages-read');
const pageToReadDiv = document.getElementById('how-more-pages');


form.addEventListener("submit", handleSubmit);

let myLibrary = [];
let lastUsedIndex = 0;
let totalBooks = 0;
let totalRead = 0;
let totalPagesRead = 0;
let pageToRead = 0;

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = Number(pages);
    this.read = read;
    this.info = function() {
        return`${title} by ${author}, ${pages} pages, ${read}`;
    }
}

function findFreeIndex(array){
    let x = 0;
    for (let i = 0; i < array.length; i++) {
        x = i;
        console.log(x, i);
        if(array[i] == undefined) return i;
    }
    if(x == 0)return x;
    return x+1;
}


function addBookToLibrary(formProps){
    let haveRead = true;
    if(!formProps.haveRead)haveRead = false;
    const book= new Book(formProps.title, formProps.author, formProps.pages, haveRead)

    lastUsedIndex = findFreeIndex(myLibrary);
    
    (lastUsedIndex + 1 >= myLibrary.length) ? myLibrary.push(book) : myLibrary[lastUsedIndex] = book;

    countInformation();
    createBookForDOM(book);
}

function deleteBookFromLibrary(e){
    const index = e.target.dataset.indexInArray;
    delete myLibrary[index];
    console.log(myLibrary);

    deleteBookFromDOM(index);
}

function deleteBookFromDOM(index){
    book_elements = document.querySelectorAll(`[data-index-in-array='${index}']`);
    book_elements.forEach(element => element.remove());
}

function addBookToDOM(book_div, book_title, book_author, book_pageCount, holder, label, checkbox, delete_button){
    bookContainer.appendChild(book_div);
    book_div.appendChild(book_title);
    book_div.appendChild(holder);
    holder.appendChild(book_author);
    holder.appendChild(book_pageCount);
    book_div.appendChild(label);
    label.appendChild(checkbox);
    book_div.appendChild(delete_button);
}

function createBookForDOM(book){
    const index = myLibrary.indexOf(book);
    const book_div = document.createElement('div');
    book_div.classList.add('book');
    book_div.dataset.indexInArray = index;

    const book_title = document.createElement('div');
    const book_author = document.createElement('div');
    const book_pageCount = document.createElement('div');
    const holder = document.createElement('div');
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    const delete_button = document.createElement('button');

    const elements = [book_title, book_author, book_pageCount, holder, label, checkbox, delete_button];

    label.htmlFor = index;
    label.innerHTML = "Mark as read:";

    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("name", index);
    checkbox.id = index;
    checkbox.classList.add(book-checkbox);
    if(book.read){
        checkbox.checked = true;
    }
    checkbox.addEventListener('change', e => (e.target.checked) ? myLibrary[e.target.dataset.indexInArray].read=true : myLibrary[e.target.dataset.indexInArray].read=false);
    checkbox.addEventListener('change', e =>{
        if(e.target.checked){
            countTotalPagesRead(true, myLibrary[e.target.dataset.indexInArray].pages);
            howMuchMoreRead(false,myLibrary[e.target.dataset.indexInArray].pages)
            updateInformation()
        }
        else{
            countTotalPagesRead(false, myLibrary[e.target.dataset.indexInArray].pages);
            howMuchMoreRead(true,myLibrary[e.target.dataset.indexInArray].pages)
            updateInformation()
        }
    })
    elements.forEach(element => element.dataset.indexInArray = index);

    delete_button.addEventListener('click', countInformation);
    delete_button.addEventListener('click', deleteBookFromLibrary);
    


    book_title.classList.add('large', 'book-title');
    book_author.classList.add('book-author');
    book_pageCount.classList.add('book-pages');
    holder.classList.add("holder");
    delete_button.classList.add("delete-button");

    book_title.innerHTML = book.title;
    book_author.innerHTML = book.author;
    book_pageCount.innerHTML = `${book.pages} pages`;
    delete_button.innerHTML = "Delete";


    addBookToDOM(book_div, book_title, book_author, book_pageCount, holder, label, checkbox, delete_button);
}



function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    addBookToLibrary(formProps);
}

function countInformation(e) {
    if(!e) e = window.event;
    if(e.target.classList == "delete-button"){
        countTotalBooks(false);
        if(myLibrary[e.target.dataset.indexInArray].read){
            countTotalRead(false);
            countTotalPagesRead(false, myLibrary[e.target.dataset.indexInArray].pages);
        }
        else{
            howMuchMoreRead(false, myLibrary[e.target.dataset.indexInArray].pages);
        }
    }
    else{
        countTotalBooks(true);
        console.log(myLibrary[lastUsedIndex].read);
        if(myLibrary[lastUsedIndex].read){
            countTotalRead(true);
            countTotalPagesRead(true, myLibrary[lastUsedIndex].pages);
        }
        else{
            howMuchMoreRead(true, myLibrary[lastUsedIndex].pages);
        }
    }
    updateInformation();
}

function countTotalBooks(shouldAdd){
    (shouldAdd) ? totalBooks++ : totalBooks--;
}

function countTotalRead(shouldAdd) {
    (shouldAdd) ? totalRead++ : totalRead--;
}

function countTotalPagesRead(shouldAdd, pages) {
    (shouldAdd) ? totalPagesRead = totalPagesRead + pages : totalPagesRead = totalPagesRead - pages;
}

function howMuchMoreRead(shouldAdd, pages) {
    (shouldAdd) ? pageToRead = pageToRead + pages : pageToRead = pageToRead - pages;
}

function updateInformation() {
    totalBooksDiv.innerHTML = totalBooks;
    totalReadDiv.innerText = totalRead;
    totalPagesReadDiv.innerHTML = totalPagesRead;
    pageToReadDiv.innerHTML = pageToRead;
}
