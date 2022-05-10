let myLibrary = [];

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

Book.prototype.changeStatus = function() {
	this.read = (this.read === 'Yes') ? 'No' : 'Yes';
}

const bookForm = document.querySelector('#book-form');
const formElement = document.querySelector('form');
formElement.addEventListener("submit", (event) => {
	let newBook = new Book(document.querySelector('#title').value,
												document.querySelector('#author').value,
												document.querySelector('#pages').value,
												(document.querySelector('#read').checked === true)
												? 'Yes' : 'No');
	myLibrary.push(newBook);
	bookForm.style.display = 'none';
	formElement.reset();
	updateLibrary();
	event.preventDefault();
});

function addBookToLibrary() {
	bookForm.style.display = 'inherit';
}

let theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'No');
let lotr1 = new Book('The Fellowship of the Ring', 'J.R.R. Tolkien', '479', 'No');
let lotr2 = new Book('The Two Towers', 'J.R.R. Tolkien', '415', 'No');
let lotr3 = new Book('The Return of the King', 'J.R.R. Tolkien', '347', 'No');
myLibrary.push(theHobbit);
myLibrary.push(lotr1);
myLibrary.push(lotr2);
myLibrary.push(lotr3);

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
		let readButton = document.createElement('button');
		readButton.classList.add("read-status");
		readButton.textContent = "Read status";
		readButton.addEventListener("click", (e) => changeStatus(e));
		deleteButton.addEventListener("click", (e) => removeBook(e));
		bookCard.append(readButton);
		bookCard.append(deleteButton);
		bookshelf.append(bookCard);
	}
}

function getBookId(card) {
	return card.target.parentElement.classList.value.match(/id-[0-9]+/g)[0].split("-")[1]
}

function changeStatus(card) {
	myLibrary[getBookId(card)].changeStatus();
	updateLibrary();
}

function removeBook(card) {
	myLibrary.splice(getBookId(card), 1);
	updateLibrary();
}


updateLibrary();