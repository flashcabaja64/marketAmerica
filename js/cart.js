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

  deleteItem(product_id) {
    this.cart.filter(item => item.prodId !== product_id)
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
    .catch(err => console.log(err))
  }

  init() {
    this.loadAllProducts()
  }
}