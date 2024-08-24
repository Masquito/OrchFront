const burger = document.querySelector('#burger');
const menu = document.querySelector('#navig');

burger.addEventListener('click', () => {
    menu.classList.toggle('is-active');
});