document.addEventListener("DOMContentLoaded", ()=>{
    const button = document.getElementById('header-button');
    const header = document.querySelector('.header-container');
    button.onclick= () => {
        header.classList.add('out');
    };
});
