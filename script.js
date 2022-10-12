const myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = !!isRead;
}

function addBookToLibrary(title,author,pages, isRead) {
    const myObj = new Book(title,author,pages, isRead);
    myLibrary.push(myObj);
    console.log(myLibrary);
}