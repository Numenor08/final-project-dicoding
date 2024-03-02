function openEditModal(book) {
    const modal = document.getElementById("editModal");
    const titleInput = document.getElementById("editTitle");
    const authorInput = document.getElementById("editAuthor");
    const yearInput = document.getElementById("editYear");
    titleInput.value = book.title;
    authorInput.value = book.author;
    yearInput.value = book.year;
    modal.showModal();
    const okButton = document.getElementById("editOkButton");
    okButton.onclick = function () {
      const newTitle = titleInput.value;
      const newAuthor = authorInput.value;
      const newYear = yearInput.value;
      updateBook(book.id, { title: newTitle, author: newAuthor, year: newYear });
      modal.close();
    };
    const cancelButton = document.getElementById("editCancelButton");
    cancelButton.onclick = function () {
      modal.close();
    };
  }