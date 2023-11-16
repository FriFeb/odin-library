const bookGrid = document.getElementById("books");
const newBookBtn = document.getElementById("new-book-btn");
const newBookForm = document.getElementById("new-book-form");
const newBookTitle = document.getElementById("title");
const newBookAuthor = document.getElementById("author");
const newBookPages = document.getElementById("pages");
const newBookRead = document.getElementById("read");
const newBookFormBtn = document.getElementById("add-new-book-btn");

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleReadStatus = function () {
  this.read = !this.read;
};

function addBookToLibrary() {
  myLibrary.push(new Book(...arguments));
}

function displayBookReadStatus(book, bookBodyReadInput, bookBodyReadLabelText) {
  if (book.read) {
    bookBodyReadInput.checked = true;
    bookBodyReadLabelText.innerText = "already read";
  } else {
    bookBodyReadInput.checked = false;
    bookBodyReadLabelText.innerText = "not read yet";
  }
}

function createBookElement(index) {
  const col = document.createElement("div");
  col.classList.add("col");

  const book = document.createElement("div");
  book.classList.add("card", "border-secondary");

  const bookBody = document.createElement("div");
  bookBody.classList.add("card-body");

  const bookBodyRemoveBtn = document.createElement("button");
  bookBodyRemoveBtn.classList.add("btn-close", "float-end");
  bookBodyRemoveBtn.dataset.index = index;

  const bookBodyTitle = document.createElement("h4");
  bookBodyTitle.classList.add("card-title");
  bookBodyTitle.innerText = this.title;

  const bookBodyAuthor = document.createElement("h6");
  bookBodyAuthor.classList.add("card-subtitle", "text-secondary", "mb-3");
  bookBodyAuthor.innerText = "by " + this.author;

  const bookBodyPages = document.createElement("p");
  bookBodyPages.classList.add("card-text", "float-start");
  bookBodyPages.innerText = this.pages + " pages";

  const bookBodyReadContainer = document.createElement("div");
  bookBodyReadContainer.classList.add("float-end", "form-check", "form-switch");
  bookBodyReadContainer.dataset.index = index;

  const bookBodyReadLabel = document.createElement("label");
  bookBodyReadLabel.classList.add("form-check-label");

  const bookBodyReadLabelText = document.createElement("span");

  const bookBodyReadInput = document.createElement("input");
  bookBodyReadInput.classList.add("form-check-input");
  bookBodyReadInput.type = "checkbox";

  bookBodyReadLabel.appendChild(bookBodyReadLabelText);
  bookBodyReadLabel.appendChild(bookBodyReadInput);

  bookBodyReadContainer.appendChild(bookBodyReadLabel);

  displayBookReadStatus(this, bookBodyReadInput, bookBodyReadLabelText);

  bookBody.appendChild(bookBodyRemoveBtn);
  bookBody.appendChild(bookBodyTitle);
  bookBody.appendChild(bookBodyAuthor);
  bookBody.appendChild(bookBodyPages);
  bookBody.appendChild(bookBodyReadContainer);

  book.appendChild(bookBody);

  col.appendChild(book);

  // const col = `
  // <div class="col">
  //   <div class="card border-secondary">
  //     <div class="card-body">
  //       <button class="btn-close float-end" data-index="${index}"></button>
  //       <h4 class="card-title">${this.title}</h4>
  //       <h6 class="card-subtitle text-secondary mb-3">by ${this.author}</h6>
  //       <p class="card-text float-start">${this.pages} pages</p>
  //       <div class="float-end form-check form-switch" data-index="${index}">
  //         <label class="form-check-label">
  //           <input type="checkbox" class="form-check-input">
  //           <span></span>
  //         </label>
  //       </div>
  //     </div>
  //   </div>
  // </div>
  // `;

  return col;
}

function displayBooksInLibrary() {
  bookGrid.innerHTML = "";

  myLibrary.forEach((book, index) => {
    bookGrid.appendChild(createBookElement.call(book, index));
    // bookGrid.innerHTML += createBookElement.call(book, index);
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

function removeBookFromLibrary(bookIndex) {
  myLibrary = myLibrary.filter((book, index) => Number(bookIndex) !== index);

  displayBooksInLibrary();
}

bookGrid.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-close")) {
    removeBookFromLibrary(e.target.dataset.index);
  }

  const bookReadContainer = e.target.closest(".form-check");

  if (bookReadContainer) {
    if (e.target.nodeName === "SPAN") e.preventDefault();

    const currentBook = myLibrary[bookReadContainer.dataset.index];

    currentBook.toggleReadStatus();

    displayBookReadStatus(
      currentBook,
      bookReadContainer.querySelector(".form-check-input"),
      bookReadContainer.querySelector(".form-check-label > span")
    );
  }
});
