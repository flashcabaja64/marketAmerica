let jsonlist = []
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav_menu');

hamburger.addEventListener("click", showMenu);

function showMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

function renderCards(items) {
  let card_container = document.getElementById('cards_wrapper')

  let result = items.map((el, idx) => {
    return `
      <div class="main_card">
        <div class="card_img">
          <img src="${el.imageURL}" />
        </div>
        <section class="card_text_wrapper">
          <h4 class="card_title">${el.caption}</h4>
          <div class="card_details_wrapper">
            <div>${el.brand}</div>
            <div>${el.currency}${el.price}</div>
          </div>
        </section>
        <section class="card_buttons">
          <button class="more_info" data-id="${el.prodId}" onclick="showModal(this)">More Info.</button>
          <button>Add Cart</button>
        </section>
      </div>
    `
  })
  card_container.innerHTML = result.join("")
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
    .then(() => renderCards(jsonlist))
    
}

getData()
