let myLibrary = [];

function Book(cover, title, author, pages, read) {
	this.cover = cover;
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
const titleField = document.querySelector('#title');
const cancelButton = document.querySelector('#cancel');

addBookButton.addEventListener("click", () => addBookToLibrary());

function addBookToLibrary() {
	formContainer.style.display = 'inherit';
}

function checkIfExists() {
	if (myLibrary.find(book => book.title == document.querySelector('#title').value)) {
		titleField.setCustomValidity("Book already exists!");
	} else titleField.setCustomValidity("");
}

bookForm.addEventListener("submit", (event) => {
	event.preventDefault();
	myLibrary.push(new Book(document.querySelector('#cover').value,
								document.querySelector('#title').value,
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
	let bookInfo = document.createElement('div');
	bookInfo.classList.add('book-info');
	bookCard.append(bookInfo);
	// create the properties on the card from the object contents
	for (let property in myLibrary[book]) {
		if (myLibrary[book].hasOwnProperty(property)) {
			if (myLibrary[book][property] !== "") {
				if (property === "cover") {
					let bookCover = document.createElement('img');
					bookCover.classList.add(property);
					bookCover.src = myLibrary[book][property];
					bookCover.alt = `${myLibrary[book].title}'s cover`;
					bookInfo.append(bookCover);
				} else {
					let bookProperty = document.createElement('div');
					bookProperty.classList.add(property);
					let propertyName = document.createElement('span');
					propertyName.classList.add('property-name');
					let propertyValue = document.createElement('span');
					propertyName.textContent = `${property.charAt(0).toUpperCase() + property.slice(1)}: `;
					propertyValue.textContent = myLibrary[book][property];
					bookProperty.append(propertyName, propertyValue);
					bookInfo.append(bookProperty);
				}
			}
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

let theHobbit = new Book('https://images-na.ssl-images-amazon.com/images/I/710+HcoP38L.jpg', 'The Hobbit', 'J.R.R. Tolkien', '295', 'No');
let lotr1 = new Book('https://images-na.ssl-images-amazon.com/images/I/41gHG-a2OEL._SX331_BO1,204,203,200_.jpg', 'The Fellowship of the Ring', 'J.R.R. Tolkien', '479', 'No');
let lotr2 = new Book('https://m.media-amazon.com/images/I/4123zOAwAgL.jpg', 'The Two Towers', 'J.R.R. Tolkien', '415', 'No');
let lotr3 = new Book('https://m.media-amazon.com/images/I/41KGl2FqeAL.jpg', 'The Return of the King', 'J.R.R. Tolkien', '347', 'No');
myLibrary.push(theHobbit);
myLibrary.push(lotr1);
myLibrary.push(lotr2);
myLibrary.push(lotr3);
updateLibrary();