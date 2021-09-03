class ShoppingCart {
  constructor() {
    this.cart = [];
    this.allProducts = [];
  }
  
  addItem(product_id) {
    let newItem = this.allProducts.find(item => {
      return item.prodId === product_id
    })
    
    if(!this.cart.length) {
      newItem.quantity = 1
      this.cart.push(newItem)
    } 

    if(this.find(product_id)) {
      this.find(product_id).quantity += 1
    } else {
      newItem.quantity = 1
      this.cart.push(newItem)
    }

    localStorage.setItem('cart', JSON.stringify(this.cart))
  }

  find(product_id) {
    let match = this.cart.filter(item => {
      if(item.prodId === product_id) return true
    })

    if(match && match[0]) return match[0]
  }

  deleteCartItem = (product_id) => {
    let idx = null;
    for(let i = 0; i < this.cart.length; i++) {
      if(this.cart[i].prodId === product_id) {
        idx = i
        break;
      }
    }
    this.cart.splice(idx, 1)
    localStorage.setItem('cart', JSON.stringify(this.cart))
  }
  
  getCart() {
    return JSON.parse(localStorage.getItem('cart'))
  }

  clearCart() {
    localStorage.clear();
  }

  loadAllProducts() {
    fetch('./ListJSONTest.json')
      .then(async res => await res.json())
      .then(async data => {
        await data.List.forEach(el => this.allProducts.push(el))
      })
      .then(() => {
        this.getCart().forEach(item => this.cart.push(item))
      })
      .catch(err => console.log(err))
  }

  //Calculations

  calculateTotal() {
    let subtotal = document.getElementById("subtotal");
    let result = this.getCart().reduce((acc, cur) => {
      return acc + (cur.quantity * cur.price)
    }, 0)
    return subtotal.innerHTML = result
  }

  addQuantity(product_id) {
    //console.log(product_id)
    this.find(product_id).quantity += 1
  }

  subtractQuantity(product_id) {
    console.log(this.find(product_id))
    // reflect cart changes in the DOM input value
    this.find(product_id).quantity !== 0 
      ? this.find(product_id).quantity -= 1 
      : this.find(product_id).quantity = 0

    localStorage.setItem('cart', JSON.stringify(this.cart))
    this.calculateTotal();
  }

  renderAllCart() {
    let cart_container = document.getElementById("cart_container");
    if(this.getCart() !== null || !this.cart.length) {
      return this.getCart().forEach(item => {
        cart_container.innerHTML += `
        <div class="cart_item">
          <div class="cart_img">
            <img src="${item.mediumImageURL}" alt="cart_image" />
          </div>
          <div class="cart_content">
            <ul>
              <li class="cart_title">${item.caption}</li>
              <li class="cart_sub">${item.description}</li>
              <li class="cart_price">${item.currency}${item.price}</li>
              <li class="cart_brand"><span>Brand: </span>${item.brand}</li>
              <li class="cart_buttons" data-id="${item.prodId}">
                <button class="arrow_minus" onclick="minusQuantity(event)"> - </button>
                <input class="cart_quantity" type="number" value="${item.quantity}"/>
                <button class="arrow_plus" onclick="addQuantity(event)"> + </button>
                <a class="cart_delete" onclick="deleteItem(this)">Delete</a>
              </li>
            </ul>
          </div>
        </div>
        `
      })
    } else {
      cart_container.innerHTML = `
      <div class="cart_empty"><p>Cart is empty</p></div>
      `
    }
  }

  init() {
    this.loadAllProducts();
    this.renderAllCart();
  }
}