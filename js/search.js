document.addEventListener('DOMContentLoaded', function() {
    const inputSearch = document.querySelector('.input-search');
  
    inputSearch.addEventListener('input', function() {
      if (this.value.trim() !== '') {
        this.classList.add('has-value');
      } else {
        this.classList.remove('has-value');
      }
    });
  });