let jsonlist = []
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav_menu');

hamburger.addEventListener("click", showMenu);

function showMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

function showModal(element) {
  const modal = document.querySelector(".modal");
  modal.classList.toggle("show-modal")
  renderModal(element.dataset.id)
}

function renderModal(id) {
  const res = jsonlist.find(el => el.prodId === parseInt(id))
  //console.log(res.quantity)
}


function getData() {
  fetch('ListJSONTest.json')
    .then(res => res.json())
    .then(data => {
      //console.log(data.List)
      data.List.forEach(el => jsonlist.push(el))
    })
    .then(() => console.log(jsonlist))
    
}

getData()
