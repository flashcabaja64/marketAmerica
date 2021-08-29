const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav_menu');

hamburger.addEventListener("click", showMenu);

function showMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}


function getData() {
  fetch('ListJSONTest.json').then(res => res.json()).then(data => console.log(data.List))
}

getData()