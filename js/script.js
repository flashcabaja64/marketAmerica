const jsonlist = []
const shoppingCart = new ShoppingCart();

document.addEventListener('DOMContentLoaded', () => {
  getData();
  shoppingCart.init();
})

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav_menu');

const showMenu = () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

hamburger.addEventListener("click", showMenu);

const sortBy = (value) => {
  if(value === 'priceLow') {
    jsonlist.sort((a, b) => {
      if(a.price > b.price) return 1
      if(a.price < b.price) return -1
    })
  } else if(value === 'priceHigh') {
    jsonlist.sort((a, b) => {
      if(b.price > a.price) return 1
      if(b.price < a.price) return -1
    })
  } else if(value === 'titleAZ') {
    jsonlist.sort((a, b) => {
      let nameA = a.caption.toLowerCase();
      let nameB = b.caption.toLowerCase();

      if(nameA < nameB) return -1;
      if(nameA > nameB) return 1
    })
  } else if(value === 'titleZA') {
    jsonlist.sort((a, b) => {
      let nameA = a.caption.toLowerCase();
      let nameB = b.caption.toLowerCase();

      if(nameB < nameA) return -1;
      if(nameB > nameA) return 1
    })
  } else if(value === 'available') {
    jsonlist.sort((a, b) => {
      return (a.isAvailable === b.isAvailable) ? 0 : a ? 1 : -1
    })
  }
  renderCards(jsonlist)
}

const renderCards = (items) => {
  let card_container = document.getElementById('cards_wrapper');

  let result = items.map(el => {
    return `
      <div class="main_card">
        <div class="card_img">
          <img class="product_img" src="${el.imageURL}" />
        </div>
        <section class="card_text_wrapper">
          <h4 class="card_title">${el.caption}</h4>
          <div class="card_details_wrapper">
            <div>${el.brand}</div>
            <div>${el.currency}${el.price}</div>
          </div>
          <section class="card_buttons">
            <button class="more_info">More Info.</button>
            <button data-id="${el.prodId}" onclick="addCart(this)">Add Cart</button>
          </section>
        </section>
      </div>
    `
  })
  card_container.innerHTML = result.join("")
}

// Cart functions
const addCart = (element) => {
  shoppingCart.addItem(parseInt(element.dataset.id))
}

const deleteItem = (element) => {
  shoppingCart.deleteCartItem(parseInt(element.dataset.id))
  element.parentElement.parentElement.parentElement.parentElement.remove()
}

const showModal = (element) => {
  shoppingCart.renderAllCart();
  document.body.style.overflow = 'hidden'
  const modal = document.querySelector(".modal");
  modal.classList.toggle("show-modal")
  //renderModal(element.dataset.id)
}

const renderModal = (id) => {
  return jsonlist.find(el => el.prodId === parseInt(id))
  //console.log(res.quantity)
}

const closeModal = () => {
  const modal = document.querySelector(".modal");
  modal.classList.toggle("show-modal")
  document.getElementById("cart_container").innerHTML = '';
  document.body.style.overflow = 'auto';
}

const getData = () => {
  fetch('ListJSONTest.json')
    .then(async res => await res.json())
    .then(async data => {
      //console.log(data.List)
      await data.List.forEach(el => jsonlist.push(el))
    })
    .then(() => renderCards(jsonlist))
}
