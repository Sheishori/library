let myLibrary = [];

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

Book.prototype.info = function() {
		return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
}

const bookForm = document.querySelector('#book-form');
const formElement = document.querySelector('form');
formElement.addEventListener("submit", (event) => {
	let newBook = new Book(document.querySelector('#title').value,
												document.querySelector('#author').value,
												document.querySelector('#pages').value,
												document.querySelector('#read').value);
	myLibrary.push(newBook);
	bookForm.style.display = 'none';
	updateLibrary();
	event.preventDefault();
});

function addBookToLibrary() {
	bookForm.style.display = 'inherit';
}

let theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'No');
myLibrary.push(theHobbit);
myLibrary.push(theHobbit);
myLibrary.push(theHobbit);
myLibrary.push(theHobbit);

const bookshelf = document.querySelector("#bookshelf");
const addBook = document.querySelector('.add-book');
addBook.addEventListener("click", () => addBookToLibrary());

function updateLibrary() {
	bookshelf.textContent = "";
	for (let book in myLibrary) {
		let bookCard = document.createElement('div');
		bookCard.classList.add('card');
		bookCard.classList.add(`id-${book}`);
		for (let property in myLibrary[book]) {
			if (myLibrary[book].hasOwnProperty(property)) {
				let bookProperty = document.createElement('div');
				bookProperty.textContent = `${property.charAt(0).toUpperCase() + property.slice(1)}: ${myLibrary[book][property]}`;
				bookCard.append(bookProperty);
			}
		}
		let deleteButton = document.createElement('button');
		deleteButton.classList.add("remove");
		deleteButton.textContent = "Remove";
		bookCard.append(deleteButton);
		bookshelf.append(bookCard);
	}
}



updateLibrary();