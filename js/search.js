document.addEventListener("DOMContentLoaded", function () {
  const inputSearch = document.querySelector(".input-search");

  inputSearch.addEventListener("input", function () {
    if (this.value.trim() !== "") {
      this.classList.add("has-value");
    } else {
      this.classList.remove("has-value");
    }
  });
});

function searchBooks() {
  const searchText = document.getElementById("search").value.toLowerCase();
  const searchResults = arrBooks.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchText) ||
      book.author.toLowerCase().includes(searchText) ||
      book.year.toString().includes(searchText)
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