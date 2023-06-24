const bookContainer = document.querySelector('#books')
const form = document.getElementById('add-form');
form.addEventListener("submit", handleSubmit);

let myLibrary = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return`${title} by ${author}, ${pages} pages, ${read}`;
    }
}

function addBookToLibrary(formProps){
    let haveRead = false;
    if(!formProps.haveRead){
        haveRead = false;
    }
    else{
        haveRead = true;
    }
    const book= new Book(formProps.title, formProps.author, formProps.pages, haveRead)
    myLibrary.push(book);
    createBookForDOM(book)
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

    const elements = [book_title, book_author, book_pageCount, holder, label, checkbox];

    label.htmlFor = index;
    label.innerHTML = "Mark as read:";

    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("name", index);
    checkbox.id = index;
    checkbox.classList.add(book-checkbox);

    elements.forEach(element => element.dataset.indexInArray = index);

    book_title.classList.add('large', 'book-title');
    book_author.classList.add('book-author');
    book_pageCount.classList.add('book-pages');
}

function addBookToDOM(book_title, book_author, book_pageCount, holder, label, checkbox){

}

function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    addBookToLibrary(formProps);
}
