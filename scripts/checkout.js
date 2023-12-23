import {
  cart,
  removeFromCart,
  updateCartQuantityCheckout,
  updateQuantityItem
} from '../data/cart.js';
import {
  products
} from '../data/products.js';
import {
  handlePrice
} from './utils/money.js';

// console.log(cart);

//checkout Items
updateCartQuantityCheckout();


let html = '';
cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProductId;
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProductId = product;
    }
  })

  html += `
  <div class="cart-item-container js-cart-item-container-${matchingProductId.id}">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProductId.image}"></img>

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProductId.name}
        </div>
        <div class="product-price">
        $${handlePrice(matchingProductId.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary" data-product-id="${matchingProductId.id}">
            Update
          </span>
          <input class="quantity-input" data-product-id="${matchingProductId.id}">
          <span class="save-quantity-link link-primary"
          data-product-id="${matchingProductId.id}">
            Save
          </span>
          
          <span class="delete-quantity-link link-primary" data-product-id="${matchingProductId.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        <div class="delivery-option">
          <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-${matchingProductId.id}">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProductId.id}">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProductId.id}">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
})
document.querySelector('.js-order-summary').innerHTML = html;

//remove cart when i click delete
document.querySelectorAll('.delete-quantity-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);

    const containCart = document.querySelector(`.js-cart-item-container-${productId}`);

    containCart.remove();

    updateCartQuantityCheckout();
  })
})

//show console.log(id) when lick update
document.querySelectorAll('.update-quantity-link').forEach((updateLink) => {
  updateLink.addEventListener('click', () => {
    const {productId} = updateLink.dataset;
    let cartItem = document.querySelector(`.js-cart-item-container-${productId}`);
    cartItem.classList.add('is-editing-quantity');
  })
})

//show console.log(id) when lick save
document.querySelectorAll('.save-quantity-link').forEach((saveLink) => {
  saveLink.addEventListener('click', () => {
    const {productId} = saveLink.dataset;

    let inputUpdate = document.querySelector(`.js-cart-item-container-${productId} .quantity-input`);
   
    updateQuantityItem(productId, inputUpdate);  
  })
})

//you can press "Enter" after enter new quantity
document.querySelectorAll('.quantity-input').forEach((inputQuantity) => {
  inputQuantity.addEventListener('keyup', (e) => {
    const {productId} = inputQuantity.dataset;
    let inputUpdate = document.querySelector(`.js-cart-item-container-${productId} .quantity-input`);
    if(e.key === 'Enter') {
      updateQuantityItem(productId, inputUpdate);  
    }
  })
})

console.log(123);