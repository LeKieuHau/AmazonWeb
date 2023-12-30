import { cart } from "../../data/cart.js";

export function renderCheckoutHeader() {

  let htmlCheckoutHeader = "";

  htmlCheckoutHeader = `
    Checkout (<a class="return-to-home-link js-checkout-items"
    href="amazon.html">${cart.length} items</a>)
  `
  document.querySelector(".js-checkout-header").innerHTML = htmlCheckoutHeader;
}

