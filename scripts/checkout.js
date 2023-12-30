import {
  cart,
  removeFromCart,
  updateCartQuantityCheckout,
  updateQuantityItem,
  updateDeliveryOption
} from '../data/cart.js';
import {
  products
} from '../data/products.js';
import {
  deliveryOptions
} from '../data/deliveryOption.js';
import {
  handlePrice
} from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


//checkout Items
updateCartQuantityCheckout();

//render code cart
function renderCartHTML() {
  let html = '';
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct;
    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    })

    const deliveryOptionIdCart = cartItem.deliveryOptionId;
    let matchingDeliveryOption;
    deliveryOptions.forEach((deliveryOption) => {
      if(deliveryOption.id === deliveryOptionIdCart)
        matchingDeliveryOption=deliveryOption;
    })
    let today = dayjs();
    let deliveryDay = today.add(matchingDeliveryOption.deliveryTime, 'days');
    let deliveryFormat = deliveryDay.format('dddd, MMMM D');

    html += `
  <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: ${deliveryFormat}
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}"></img>

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
        $${handlePrice(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary" data-product-id="${matchingProduct.id}">
            Update
          </span>
          <input class="quantity-input" data-product-id="${matchingProduct.id}">
          <span class="save-quantity-link link-primary"
          data-product-id="${matchingProduct.id}">
            Save
          </span>
          
          <span class="delete-quantity-link link-primary" data-product-id="${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        
        ${deleveryOptionHTML(matchingProduct.id, cartItem.deliveryOptionId)}
        
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
      const {
        productId
      } = updateLink.dataset;
      let cartItem = document.querySelector(`.js-cart-item-container-${productId}`);
      cartItem.classList.add('is-editing-quantity');
    })
  })

  //show console.log(id) when lick save
  document.querySelectorAll('.save-quantity-link').forEach((saveLink) => {
    saveLink.addEventListener('click', () => {
      const {
        productId
      } = saveLink.dataset;

      let inputUpdate = document.querySelector(`.js-cart-item-container-${productId} .quantity-input`);

      updateQuantityItem(productId, inputUpdate);
    })
  })

  //you can press "Enter" after enter new quantity
  document.querySelectorAll('.quantity-input').forEach((inputQuantity) => {
    inputQuantity.addEventListener('keyup', (e) => {
      const {
        productId
      } = inputQuantity.dataset;
      let inputUpdate = document.querySelector(`.js-cart-item-container-${productId} .quantity-input`);
      if (e.key === 'Enter') {
        updateQuantityItem(productId, inputUpdate);
      }
    })
  })


  //use dayjs
  document.querySelectorAll('.js-delivery-option').forEach((rdDeliveryOption) => {
    rdDeliveryOption.addEventListener('click', () => {
      const {
        productId,
        deliveryOptionId
      } = rdDeliveryOption.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderCartHTML();
    })
  })
}

//render code delevery Option
function deleveryOptionHTML(productId, cartDeliveryId) {
  let html ='';
  deliveryOptions.forEach((deliveryOption) =>{
    let today = dayjs();
    let deliveryDay = today.add(deliveryOption.deliveryTime, 'days');
    let deliveryFormat = deliveryDay.format('dddd, MMMM D');
    let deliveryPrice = deliveryOption.id==='1' ? 'FREE' : `$${handlePrice(deliveryOption.deliveryPrice)}`;
    let isChecked = deliveryOption.id===cartDeliveryId ? 'checked':'';

    html += `
    <div class="delivery-option js-delivery-option"
    data-product-id="${productId}"
    data-delivery-option-id="${deliveryOption.id}">
      <input type="radio" ${isChecked}
        class="delivery-option-input"
        name="delivery-option-${productId}">
      <div>
        <div class="delivery-option-date">
        ${deliveryFormat}
        </div>
        <div class="delivery-option-price">
          ${deliveryPrice} - Shipping
        </div>
      </div>
    </div>
    `;
  })
return html;
}

//call funtion renderHtml
renderCartHTML();