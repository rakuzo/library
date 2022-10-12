const bookForm = document.querySelector('.book-form')
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const reads = document.querySelectorAll('input[name=read-status]');
const myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function addBookToLibrary(title,author,pages, isRead) {
    const myObj = new Book(title,author,pages, isRead);
    myLibrary.push(myObj);
    console.log(myLibrary);
}

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let tempTitle = title.value;
    let tempAuthor = author.value;
    let tempPages = pages.value
    let readStatus = '';
    for (let read of reads) {
        if (read.checked) {
            readStatus = read.value;
        }
    }
    addBookToLibrary(tempTitle, tempAuthor, tempPages, readStatus);
});