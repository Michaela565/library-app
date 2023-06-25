const bookContainer = document.querySelector('.books');
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
    let inLibrary = false;
    let haveRead = false;
    if(!formProps.haveRead){
        haveRead = false;
    }
    else{
        haveRead = true;
    }
    const book= new Book(formProps.title, formProps.author, formProps.pages, haveRead)

    for (let i = 0; i < myLibrary.length; i++) {
        if(myLibrary[i] == undefined){
            myLibrary[i] = book;
            inLibrary = true;
            break;
        }
        
    }
    
    if(inLibrary == false){
        myLibrary.push(book);
    }
    inLibrary == false;
    createBookForDOM(book)
}

function deleteBookFromLibrary(e){
    const index = e.target.dataset.indexInArray
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

    elements.forEach(element => element.dataset.indexInArray = index);

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
