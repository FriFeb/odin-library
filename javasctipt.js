const bookGrid = document.querySelector(".row");

const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  const str = `${this.title} by ${this.author}, ${this.pages} pages, `;
  return str + (this.read ? "already read" : "not read yet");
};

function addBookToLibrary() {
  myLibrary.push(new Book(...arguments));
}

function createBookElement() {
  const col = document.createElement("div");
  col.classList.add("col");

  const book = document.createElement("div");
  book.classList.add("card", "border-secondary");

  const bookBody = document.createElement("div");
  bookBody.classList.add("card-body");

  const bookBodyTitle = document.createElement("h4");
  bookBodyTitle.classList.add("card-title");
  bookBodyTitle.innerText = this.title;

  const bookBodyAuthor = document.createElement("h6");
  bookBodyAuthor.classList.add("card-subtitle", "text-secondary", "mb-3");
  bookBodyAuthor.innerText = "by " + this.author;

  const bookBodyPages = document.createElement("p");
  bookBodyPages.classList.add("card-text", "float-start");
  bookBodyPages.innerText = this.pages + " pages";

  const bookBodyRead = document.createElement("p");
  bookBodyRead.classList.add("card-text", "float-end");
  bookBodyRead.innerText = this.read ? "already read" : "not read yet";

  bookBody.appendChild(bookBodyTitle);
  bookBody.appendChild(bookBodyAuthor);
  bookBody.appendChild(bookBodyPages);
  bookBody.appendChild(bookBodyRead);

  book.appendChild(bookBody);

  col.appendChild(book);

  return col;
}

function displayBooksInLibrary() {
  bookGrid.innerHTML = "";

  myLibrary.forEach((book) => {
    bookGrid.appendChild(createBookElement.call(book));
  });
}

addBookToLibrary("The Hobbit", "J. R. R. Tolkien", 310, true);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 225, false);
addBookToLibrary("War and Peace", "Leo Tolstoy", 1225, false);
addBookToLibrary("Hamlet", "William Shakespeare", 378, true);

displayBooksInLibrary();
