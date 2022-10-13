const bookForm = document.querySelector('.book-form');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const reads = document.querySelectorAll('input[name=read-status]');
const myLibrary = [];

class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
    changeStatus() {
        if (this.isRead === 'No') {
            this.isRead = 'Yes';
        } else {
            this.isRead = 'No';
        }
    }
}

function addBookToLibrary(title,author,pages, isRead) {
    const myObj = new Book(title,author,pages, isRead);
    myLibrary.push(myObj);
}

// Data Example
addBookToLibrary('To Kill a Mockingbird','Harper Lee',278,'No');
addBookToLibrary('The Silent Patient','Alex Michaelides',265,'Yes');

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
        const isReadBtn = document.createElement('button');
        isReadBtn.setAttribute('class', 'Read-Button');
        if (myLibrary[item].isRead === 'Yes') {
            isReadBtn.classList.add('green-button');
        } else {
            isReadBtn.classList.add('red-button');
        }
        isReadBtn.innerText = myLibrary[item].isRead;
        isReadBtn.addEventListener('click', () => {
            myLibrary[item].changeStatus();
            resetTable();
            showLibrary();
        });
        isReadData.appendChild(isReadBtn);
        document.getElementById(`book-row${item}`).appendChild(isReadData);

        const deleteData = document.createElement('td');
        deleteData.setAttribute('class', 'center-text');
        const delBtn = document.createElement('button');
        delBtn.setAttribute('class', 'delete');
        delBtn.setAttribute('data-key', `${item}`);
        //SVG Icon
        const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        iconSvg.setAttribute('viewBox', '0 0 24 24');
        iconPath.setAttribute(
            'd',
            'M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z'
        );
        iconSvg.appendChild(iconPath);
        delBtn.appendChild(iconSvg);
        // delBtn.innerText = 'Delete';
        delBtn.addEventListener('click', e => {
            myLibrary.splice(e.target.dataset.key,1);
            resetTable();
            showLibrary();
        })
        deleteData.appendChild(delBtn);
        document.getElementById(`book-row${item}`).appendChild(deleteData);
    }
}

function resetTable() {
    const newRows = document.querySelectorAll('.book-row');
    for (let i = 0; i < newRows.length; i++) {
        newRows[i].parentNode.removeChild(newRows[i]);
    }
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