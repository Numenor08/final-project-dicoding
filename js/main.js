//* Form
let title = document.getElementById("title");
let author = document.getElementById("author");
let year = document.getElementById("year");
let isComplete = document.getElementById("read");

const STORAGE_KEY = "BOOK-SHELF";
const RENDER_EVENT = "rendering-books";
const SAVED_EVENT = "saving-books";

let arrBooks = [];

const generateObject = (id, title, author, year, isComplete) => {
  return {
    id,
    title,
    author,
    year,
    isComplete,
  };
};

function generateId() {
  return +new Date();
}

const createBook = (book) => {
  const bookGroup = document.createElement("div");
  bookGroup.classList.add("bookGroup");
  bookGroup.setAttribute("id", `${book.id}`);

  const bookInfo = document.createElement("div");
  const title = document.createElement("h3");
  title.classList.add("book__title");
  title.textContent = book.title;
  const author = document.createElement("h4");
  const year = document.createElement("h4");
  author.classList.add("book__author");
  year.classList.add("book__author");
  author.textContent = `Author: ${book.author}`;
  year.textContent = `Year: ${book.year}`;
  bookInfo.appendChild(title);
  bookInfo.appendChild(author);
  bookInfo.appendChild(year);

  const buttons = document.createElement("div");
  if (book.isComplete) {
    const undo = document.createElement("div");
    undo.classList.add("btn2");
    const undoImg = document.createElement("img");
    undoImg.setAttribute("src", "./img/undo-left-round-svgrepo-com.svg");
    undoImg.setAttribute("alt", "logo-undo");
    undo.appendChild(undoImg);
    undo.addEventListener("click", () => {
      bookUndo(book.id);
    });
    buttons.appendChild(undo);
  } else {
    const done = document.createElement("div");
    done.classList.add("btn2");
    const doneImg = document.createElement("img");
    doneImg.setAttribute("src", "./img/done-mini-1484-svgrepo-com.svg");
    doneImg.setAttribute("alt", "logo-done");
    done.appendChild(doneImg);
    done.addEventListener("click", () => {
      bookDone(book.id);
    });
    buttons.appendChild(done);
  }

  const edit = document.createElement("div");
  edit.classList.add("btn2");
  const editImg = document.createElement("img");
  editImg.setAttribute("src", "./img/edit-svgrepo-com.svg");
  editImg.setAttribute("alt", "logo-edit");
  edit.appendChild(editImg);
  edit.addEventListener("click", () => {
    openEditModal(book);
  });
  buttons.appendChild(edit);

  const deletes = document.createElement("div");
  deletes.classList.add("btn2");
  const deleteImg = document.createElement("img");
  deleteImg.setAttribute("src", "./img/delete-svgrepo-com.svg");
  deleteImg.setAttribute("alt", "logo-delete");
  deletes.appendChild(deleteImg);
  deletes.addEventListener("click", () => {
    deleteBook(book.id);
  });
  buttons.appendChild(deletes);

  bookGroup.appendChild(bookInfo);
  bookGroup.appendChild(buttons);
  return bookGroup;
};

const findTodo = (bookId) => arrBooks.find((book) => book.id === bookId);

const findTodoIndex = (bookId) => {
  for (const [index, book] of arrBooks.entries()) {
    if (book.id === bookId) {
      return index;
    }
  }
  return -1;
};

const bookDone = (bookId) => {
  const bookTarget = findTodo(bookId);
  console.log(bookTarget);
  if (bookTarget == null) return;

  bookTarget.isComplete = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  save();
};

const bookUndo = (bookId) => {
  const bookTarget = findTodo(bookId);
  console.log(bookTarget);
  if (bookTarget == null) return;

  bookTarget.isComplete = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  save();
};

const deleteBook = (bookId) => {
  const bookTarget = findTodoIndex(bookId);
  if (bookTarget === -1) return;
  arrBooks.splice(bookTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  save();
};

function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
  return true;
}

const save = () => {
  if (isStorageExist()) {
    const parsed = JSON.stringify(arrBooks);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
};

const addBook = (arrBooks) => {
  const id = generateId();
  const obj = generateObject(
    id,
    title.value,
    author.value,
    parseInt(year.value),
    isComplete.checked
  );
  arrBooks.push(obj);
  createBook(obj);
  title.value = "";
  author.value = "";
  year.value = "";
  isComplete.checked = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  save();
};

const loadData = (arrBooks) => {
  const needParse = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(needParse);
  if (data !== null) {
    data.forEach((value) => arrBooks.push(value));
  }
  document.dispatchEvent(new Event(RENDER_EVENT));
};

function updateBook(bookId, updatedData) {
  const bookIndex = findTodoIndex(bookId);
  if (bookIndex === -1) return;
  arrBooks[bookIndex] = { ...arrBooks[bookIndex], ...updatedData };
  document.dispatchEvent(new Event(RENDER_EVENT));
  save();
}

function searchBooks() {
  const searchText = document.getElementById("search").value.toLowerCase();
  const searchResults = arrBooks.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchText) ||
      book.author.toLowerCase().includes(searchText) ||
      book.year.toLowerCase().includes(searchText)
    );
  });

  const finishContainer = document.getElementById("finish");
  const unfinishContainer = document.getElementById("unfinish");
  finishContainer.innerHTML = "";
  unfinishContainer.innerHTML = "";

  searchResults.forEach((value) => {
    const element = createBook(value);
    if (value.isComplete) {
      finishContainer.append(element);
    } else {
      unfinishContainer.append(element);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (isStorageExist()) {
    loadData(arrBooks);
  }
  const form = document.querySelector(".form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    addBook(arrBooks);
  });
  const searchButton = document.getElementById("search-button");
  searchButton.addEventListener("click", searchBooks);
  const searchInput = document.getElementById("search");
  searchInput.addEventListener("input", searchBooks);
});

document.addEventListener(RENDER_EVENT, () => {
  const finishContainer = document.getElementById("finish");
  const unfinishContainer = document.getElementById("unfinish");
  finishContainer.innerHTML = "";
  unfinishContainer.innerHTML = "";
  arrBooks.forEach((value) => {
    const element = createBook(value);
    if (value.isComplete) {
      finishContainer.append(element);
    } else {
      unfinishContainer.append(element);
    }
  });
  if (finishContainer.innerHTML.trim() === "") {
    finishContainer.innerHTML = '<h3 class="empty">Empty</h3>';
}

if (unfinishContainer.innerHTML.trim() === "") {
    unfinishContainer.innerHTML = '<h3 class="empty">Empty</h3>';
}

});

document.addEventListener(SAVED_EVENT, function () {
  const popup = document.querySelector(".popup");
  if (popup) {
    popup.classList.add("show");
    setTimeout(function () {
      popup.classList.remove("show");
    }, 3000);
    console.log(popup);
  }
});
