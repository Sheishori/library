let myLibrary = [];

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.info = function() {
		return `${title} by ${author}, ${pages} pages, ${read}`;
	}
}

function addBookToLibrary() {
	let title = prompt("Title:");
	let author = prompt("Author:");
	let pages = prompt("Pages:");
	let read = prompt("Read status:");
	let newBook = new Book(title, author, pages, read);
	myLibrary.push(newBook);
}

addBookToLibrary();

console.log(myLibrary);