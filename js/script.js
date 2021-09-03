const jsonlist = []
const shoppingCart = new ShoppingCart();

document.addEventListener('DOMContentLoaded', () => {
  getAllProducts();
  shoppingCart.init();
})

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav_menu');

const showMenu = () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

hamburger.addEventListener("click", showMenu);

// Populate all items
const getAllProducts = () => {
  fetch('ListJSONTest.json')
    .then(async res => await res.json())
    .then(async data => {
      await data.List.forEach(el => jsonlist.push(el))
    })
    .then(() => renderCards(jsonlist))
}

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
  renderCards(jsonlist);
}

// Cart functions
const addCart = (item) => {
  shoppingCart.addItem(parseInt(item.dataset.id));
}

const deleteItem = (item) => {
  shoppingCart.deleteCartItem(parseInt(item.parentElement.dataset.id));
  item.parentElement.parentElement.parentElement.parentElement.remove();
  shoppingCart.calculateTotal();
}

const addQuantity = (item) => {
  shoppingCart.addQuantity(parseInt(item.target.parentElement.dataset.id));
  shoppingCart.calculateTotal();
}
const minusQuantity = (item) => {
  shoppingCart.subtractQuantity(parseInt(item.target.parentElement.dataset.id));
  shoppingCart.calculateTotal();
}

const renderCards = (items) => {
  let card_container = document.getElementById('cards_wrapper');

  let result = items.map(item => {
    return `
      <div class="main_card">
        <div class="card_img">
          <img class="product_img" src="${item.imageURL}" />
        </div>
        <section class="card_text_wrapper">
          <h4 class="card_title">${item.caption}</h4>
          <div class="card_details_wrapper">
            <div>${item.brand}</div>
            <div>${item.currency}${item.price}</div>
          </div>
          <section class="card_buttons">
            <button class="more_info">More Info.</button>
            <button data-id="${item.prodId}" onclick="addCart(this)">Add Cart</button>
          </section>
        </section>
      </div>
    `
  })
  card_container.innerHTML = result.join("")
}

// Modal functions
const showModal = (element) => {
  shoppingCart.renderAllCart();
  shoppingCart.calculateTotal();
  document.body.style.overflow = 'hidden';
  const modal = document.querySelector(".modal");
  modal.classList.toggle("show-modal");
  //renderModal(element.dataset.id)
}

const renderModal = (id) => {
  return jsonlist.find(el => el.prodId === parseInt(id));
  //console.log(res.quantity)
}

const closeModal = () => {
  const modal = document.querySelector(".modal");
  modal.classList.toggle("show-modal");
  document.getElementById("cart_container").innerHTML = '';
  document.body.style.overflow = 'auto';
}

