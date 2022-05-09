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

function addBookToLibrary() {
	let title = prompt("Title:");
	let author = prompt("Author:");
	let pages = prompt("Pages:");
	let read = prompt("Read status:");
	let newBook = new Book(title, author, pages, read);
	myLibrary.push(newBook);
	updateLibrary();
}

let theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'No');
myLibrary.push(theHobbit);

const bookshelf = document.querySelector("#bookshelf");

function updateLibrary() {
	for (let book in myLibrary) {
		let bookCard = document.createElement('div');
		for (let property in myLibrary[book]) {
			if (myLibrary[book].hasOwnProperty(property)) {
				let bookProperty = document.createElement('div');
				bookProperty.textContent = `${property.charAt(0).toUpperCase() + property.slice(1)}: ${myLibrary[book][property]}`;
				bookCard.append(bookProperty);
			}
		}
		bookshelf.append(bookCard);
	}
}

updateLibrary();