const bookForm = document.querySelector('.book-form')
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const reads = document.querySelectorAll('input[name=read-status]');
let deleteBtn = '';
const myLibrary = [
    {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        pages: 279,
        isRead: 'No'
    },
    {
        title: 'The Silent Patient',
        author: 'Alex Michaelides',
        pages: 265,
        isRead: 'Yes'
    },
];

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

function showLibrary() {
    for (let item in myLibrary) {
        const tableRow = document.createElement('tr');
        tableRow.setAttribute('id', `book-row${item}`)
        tableRow.setAttribute('class', 'book-row');
        document.getElementById('book-list').appendChild(tableRow);

        const titleData = document.createElement('td');
        const titleText = document.createTextNode(myLibrary[item].title);
        titleData.appendChild(titleText);
        document.getElementById(`book-row${item}`).appendChild(titleData);

        const authorData = document.createElement('td');
        const authorText = document.createTextNode(myLibrary[item].author);
        authorData.appendChild(authorText);
        document.getElementById(`book-row${item}`).appendChild(authorData);

        const pagesData = document.createElement('td');
        pagesData.setAttribute('class', 'right-text');
        const pagesText = document.createTextNode(myLibrary[item].pages);
        pagesData.appendChild(pagesText);
        document.getElementById(`book-row${item}`).appendChild(pagesData);

        const isReadData = document.createElement('td');
        isReadData.setAttribute('class', 'center-text');
        const isReadText = document.createTextNode(myLibrary[item].isRead);
        isReadData.appendChild(isReadText);
        document.getElementById(`book-row${item}`).appendChild(isReadData);

        const deleteData = document.createElement('td');
        deleteData.setAttribute('class', 'center-text');
        const delBtn = document.createElement('button');
        delBtn.setAttribute('class', 'delete');
        delBtn.innerText = 'Delete';
        // const deleteText = document.createTextNode('Delete');
        deleteData.appendChild(delBtn);
        document.getElementById(`book-row${item}`).appendChild(deleteData);
    }
    deleteBtn = document.querySelector('.delete');
}

function resetTable() {
    const newRows = document.querySelectorAll('.book-row');
    for (let i = 0; i < newRows.length; i++) {
        newRows[i].parentNode.removeChild(newRows[i]);
    }
}

function deleteBook(numb) {
    myLibrary.splice(numb,1);
    resetTable();
    showLibrary();
}

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let tempTitle = title.value;
    let tempAuthor = author.value;
    let tempPages = Number(pages.value);
    let readStatus = '';
    for (let read of reads) {
        if (read.checked) {
            readStatus = read.value;
        }
    }
    addBookToLibrary(tempTitle, tempAuthor, tempPages, readStatus);
    resetTable();
    showLibrary();
});

showLibrary();