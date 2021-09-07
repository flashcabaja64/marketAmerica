const jsonlist = [];
const shoppingCart = new ShoppingCart();

document.addEventListener('DOMContentLoaded', () => {
  getAllProducts();
  shoppingCart.init();
  window.onscroll = () => stickyNav();
})

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav_menu');
const modalContainer = document.getElementsByClassName("modal")[0];

const showMenu = () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

const closeOnClick = (event) => {
  if(event.target == modalContainer) {
    closeModal();
  }
}

hamburger.addEventListener("click", showMenu);
modalContainer.addEventListener("click", closeOnClick)

const stickyNav = () => {
  let nav = document.getElementById('sticky_nav');
  let main = document.getElementsByTagName("main")[0];
  let sticky = nav.offsetTop;
  if (window.pageYOffset >= sticky) {
    nav.classList.add("sticky");
    main.style.top = "50px";
  } else {
    nav.classList.remove("sticky");
    main.style.top = "0";
  }
}

// Populate all items
const getAllProducts = () => {
  fetch('ListJSONTest.json')
    .then(async res => await res.json())
    .then(async data => {
      await data.List.forEach(el => jsonlist.push(el));
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
  shoppingCart.totalQuantity();
}

const deleteItem = (item) => {
  shoppingCart.deleteCartItem(parseInt(item.parentElement.dataset.id));
  item.parentElement.parentElement.parentElement.parentElement.remove();
  shoppingCart.calculateTotal();
  shoppingCart.totalQuantity();
}

const addQuantity = (item, element) => {
  if(element.previousElementSibling.value <= 500) {
    shoppingCart.addQuantity(parseInt(item.target.parentElement.dataset.id));
    element.previousElementSibling.value ++;
    shoppingCart.calculateTotal();
  }
  shoppingCart.totalQuantity();
}

const minusQuantity = (item, element) => {
  if(element.nextElementSibling.value > 1) {
    shoppingCart.subtractQuantity(parseInt(item.target.parentElement.dataset.id));
    element.nextElementSibling.value -= 1;
    shoppingCart.calculateTotal();
  }
  shoppingCart.totalQuantity();
}

const renderCards = (items) => {
  let card_container = document.getElementById('cards_wrapper');

  let result = items.map(item => {
    return `
      <div class="main_card">
        <div class="card_img">
          <img role="img" class="product_img" src="${item.imageURL}" />
        </div>
        <section class="card_text_wrapper">
          <h4 class="card_title">${item.caption}</h4>
          <div class="card_details_wrapper">
            <span class="card_brand">Brand: </span>${item.brand}
          </div>
          <section class="card_buttons">
            <div class="card_price">${item.currency}${item.price}</div>
            <button class="card_btn_add" ${!item.isAvailable ? 'disabled' : ''} role="button" data-id="${item.prodId}" onclick="addCart(this)">
              <img class="card_btn_icon" src="assets/cart_icon.png" height="23px" width="23px" />
              Add to Cart
            </button>
          </section>
        </section>
      </div>
    `
  })
  card_container.innerHTML = result.join("");
  disabledButton();
}

const disabledButton = () => {
  let buttons = document.querySelectorAll('button.card_btn_add');

  buttons.forEach(button => {
    if(button.disabled) {
      button.classList.add("inactive");
      button.innerText = "Unavailable";
    } else {
      button.classList.remove("inactive");
    }
  })
}

// Modal functions
const showModal = () => {
  shoppingCart.renderAllCart();
  shoppingCart.calculateTotal();
  document.body.style.overflow = 'hidden';
  const modal = document.querySelector(".modal");
  modal.classList.toggle("show-modal");
}

const closeModal = () => {
  const modal = document.querySelector(".modal");
  modal.classList.toggle("show-modal");
  document.getElementById("cart_container").innerHTML = '';
  document.body.style.overflow = 'auto';
}