const bookGrid = document.getElementById("books");
const newBookBtn = document.getElementById("new-book-btn");
const newBookForm = document.getElementById("new-book-form");
const newBookTitle = document.getElementById("title");
const newBookAuthor = document.getElementById("author");
const newBookPages = document.getElementById("pages");
const newBookRead = document.getElementById("read");
const newBookFormBtn = document.getElementById("add-new-book-btn");

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

document.addEventListener("DOMContentLoaded", () => {
  addBookToLibrary("The Hobbit", "J. R. R. Tolkien", 310, true);
  addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 225, false);
  addBookToLibrary("War and Peace", "Leo Tolstoy", 1225, false);
  addBookToLibrary("Hamlet", "William Shakespeare", 378, true);
  displayBooksInLibrary();
});

newBookBtn.addEventListener("click", () => {
  newBookForm.classList.toggle("visually-hidden");
});

function showTextErrorMessage(element) {
  element.classList.remove("is-valid");
  element.classList.add("is-invalid");

  let errorContainer = element.nextElementSibling;

  if (element.validity.valueMissing) {
    errorContainer.innerText = `Fiil out this field!`;
    return;
  }

  if (element.validity.tooShort) {
    errorContainer.innerText = `Minimum required length is ${element.attributes.minlength.value}!`;
    return;
  }

  if (element.validity.patternMismatch) {
    errorContainer.innerText = `Should start with a capital letter!`;
    return;
  }
}

function showNumberErrorMessage(element) {
  element.classList.remove("is-valid");
  element.classList.add("is-invalid");

  let errorContainer = element.nextElementSibling;

  if (element.validity.valueMissing) {
    errorContainer.innerText = `Fiil out this field!`;
    return;
  }

  if (element.validity.rangeUnderflow) {
    errorContainer.innerText = `Minimum value is ${element.attributes.min.value}!`;
    return;
  }

  if (element.validity.rangeOverflow) {
    errorContainer.innerText = `Maximum value is ${element.attributes.max.value}!`;
    return;
  }
}

function hideErrorMessage(element) {
  element.classList.remove("is-invalid");
  element.classList.add("is-valid");

  let errorContainer = element.nextElementSibling;

  errorContainer.innerText = "";
}

newBookTitle.addEventListener("focusout", () => {
  if (!newBookTitle.validity.valid) {
    showTextErrorMessage(newBookTitle);
  } else {
    hideErrorMessage(newBookTitle);
  }
});

newBookAuthor.addEventListener("focusout", () => {
  if (!newBookAuthor.validity.valid) {
    showTextErrorMessage(newBookAuthor);
  } else {
    hideErrorMessage(newBookAuthor);
  }
});

newBookPages.addEventListener("focusout", () => {
  if (!newBookPages.validity.valid) {
    showNumberErrorMessage(newBookPages);
  } else {
    hideErrorMessage(newBookPages);
  }
});

newBookFormBtn.addEventListener("click", () => {
  if (!newBookTitle.validity.valid) showTextErrorMessage(newBookTitle);
  if (!newBookAuthor.validity.valid) showTextErrorMessage(newBookAuthor);
  if (!newBookPages.validity.valid) showTextErrorMessage(newBookPages);
});

function clearFormInputs() {
  newBookTitle.classList.remove("is-valid");
  newBookAuthor.classList.remove("is-valid");
  newBookPages.classList.remove("is-valid");

  newBookTitle.value = "";
  newBookAuthor.value = "";
  newBookPages.value = "";
  newBookRead.checked = false;
}

newBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addBookToLibrary(
    newBookTitle.value,
    newBookAuthor.value,
    newBookPages.value,
    newBookRead.checked
  );

  displayBooksInLibrary();

  clearFormInputs();

  newBookForm.classList.add("visually-hidden");
});
