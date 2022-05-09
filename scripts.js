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
}

let theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'not read yet');
myLibrary.push(theHobbit);

console.log(theHobbit.info());
