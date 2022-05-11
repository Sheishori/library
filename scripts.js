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

const bookshelf = document.querySelector("#bookshelf");
const addBookButton = document.querySelector('#add-book');
const formContainer = document.querySelector('#form-container');
const bookForm = document.querySelector('form');
const cancelButton = document.querySelector('#cancel');

addBookButton.addEventListener("click", () => addBookToLibrary());

function addBookToLibrary() {
	formContainer.style.display = 'inherit';
}

bookForm.addEventListener("submit", (event) => {
	event.preventDefault();
	myLibrary.push(new Book(document.querySelector('#title').value,
								document.querySelector('#author').value,
								document.querySelector('#pages').value,
								(document.querySelector('#read').checked === true) ? 'Yes' : 'No'));
	updateLibrary();
	formContainer.style.display = 'none';
	bookForm.reset();
});

cancelButton.addEventListener("click", () => {
	formContainer.style.display = 'none';
	bookForm.reset();
});

// reset the bookshelf and regenerate the contents
function updateLibrary() {
	bookshelf.textContent = "";
	for (let book in myLibrary) {
		bookshelf.append(generateBookCard(book));
	}
}

function generateBookCard(book) {
	let bookCard = document.createElement('div');
	bookCard.classList.add('card');
	bookCard.classList.add(`id-${book}`);
	// create the properties on the card from the object contents
	for (let property in myLibrary[book]) {
		if (myLibrary[book].hasOwnProperty(property)) {
			let bookProperty = document.createElement('div');
			bookProperty.classList.add(property);
			bookProperty.textContent =
			`${property.charAt(0).toUpperCase() + property.slice(1)}: ${myLibrary[book][property]}`;
			bookCard.append(bookProperty);
		}
	}
	let readButton = document.createElement('button');
	readButton.classList.add("read-status");
	readButton.textContent = "Read status";
	readButton.addEventListener("click", (e) => changeStatus(e));
	bookCard.append(readButton);
	let deleteButton = document.createElement('button');
	deleteButton.classList.add("remove");
	deleteButton.textContent = "Remove";
	deleteButton.addEventListener("click", (e) => removeBook(e));
	bookCard.append(deleteButton);
	return bookCard;
}

// get book object id from the button's parent's class
function getBookId(card) {
	return card.target.parentElement.classList.value.match(/id-[0-9]+/g)[0].split("-")[1]
}

function changeStatus(card) {
	myLibrary[getBookId(card)].changeStatus();
	let readDiv = document.querySelector(`.id-${getBookId(card)}`).querySelector('.read');
	readDiv.textContent = `Read: ${myLibrary[getBookId(card)].read}`
}

function removeBook(card) {
	myLibrary.splice(getBookId(card), 1);
	updateLibrary();
}

let theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'No');
let lotr1 = new Book('The Fellowship of the Ring', 'J.R.R. Tolkien', '479', 'No');
let lotr2 = new Book('The Two Towers', 'J.R.R. Tolkien', '415', 'No');
let lotr3 = new Book('The Return of the King', 'J.R.R. Tolkien', '347', 'No');
myLibrary.push(theHobbit);
myLibrary.push(lotr1);
myLibrary.push(lotr2);
myLibrary.push(lotr3);
updateLibrary();