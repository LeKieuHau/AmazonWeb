export let cart = JSON.parse(localStorage.getItem('cart'));

//if card null will set as below
if (!cart) {
  cart = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    },
    {
      productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
      quantity: 1,
      deliveryOptionId: '2'
    }
  ];
}

//save cart in localStorage
export function saveCartInLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

//can put this function at amazon.js(main), however this function relate to cart, so put it here
export function addToCart(productId) {
  let selectQuantity = document.querySelector(`.js-quantity-selector-${productId}`);

  let matchingItem;

  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += Number(selectQuantity.value);
  } else {
    cart.push({
      productId,
      quantity: Number(selectQuantity.value),
      deliveryOptionId: '1'
    });
  }
  console.log(cart);

  //every update times, we will save cart in localStorage
  saveCartInLocalStorage();

}

//update delivery option when click radio
export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  })
  matchingItem.deliveryOptionId = deliveryOptionId;

  //because update deliveryOptionId, so need save cart in localStorage
  saveCartInLocalStorage();
}



export function updateQuantityCart() {
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });


  if (cartQuantity >= 1) {
    document.querySelector('.js-cart-quantity')
      .innerHTML = cartQuantity;
  }
}


//delete cart
export function removeFromCart(productId) {
  let newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  })
  cart = newCart;

  //every update times, we will save cart in localStorage
  saveCartInLocalStorage();
}

// checkOut item
export function updateCartQuantityCheckout() {
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity++;
  });

  if (cartQuantity < 2) {
    document.querySelector('.js-checkout-items')
      .innerHTML = `${cartQuantity} item`;
  } else {
    document.querySelector('.js-checkout-items')
      .innerHTML = `${cartQuantity} items`;
  }
}

//show at icon bike
export function quantityEveryCart() {
  let sumQuantity = 0;
  cart.forEach(itemCart => sumQuantity += itemCart.quantity);
  return sumQuantity;
}

export function updateQuantityItem(productId, newQuantity) {
  let cartItem = document.querySelector(`.js-cart-item-container-${productId}`);

  if (Number(newQuantity.value) > 0 && Number(newQuantity.value) <= 10) {
    //update in cart and save in localStorage
    cart.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        cartItem.quantity = Number(newQuantity.value);
      }
    })
    saveCartInLocalStorage();

    //remove class to hide input vs Save
    cartItem.classList.remove('is-editing-quantity');
    document.querySelector(`.js-cart-item-container-${productId} .quantity-label`).innerHTML = newQuantity.value;
  }else{
    newQuantity.value = 0;
  }
}