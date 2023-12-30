import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOption.js";
import { handlePrice } from "../utils/money.js";

export function renderPaymentSummary() {
  let sumPriceCentCart = 0;
  let sumPriceCentShip = 0;
  let priceBeforeTax = 0;
  let tax = 0;
  let total = 0;
  let htmlPaymentSummary = "";
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    sumPriceCentCart += product.priceCents * cartItem.quantity;
    sumPriceCentShip += deliveryOption.deliveryPrice;
  });
  priceBeforeTax = sumPriceCentCart + sumPriceCentShip;
  tax = priceBeforeTax * 0.1;
  total = priceBeforeTax + tax;

  htmlPaymentSummary = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${cart.length}):</div>
      <div class="payment-summary-money">$${handlePrice(sumPriceCentCart)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${handlePrice(sumPriceCentShip)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${handlePrice(priceBeforeTax)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${handlePrice(tax)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${handlePrice(total)}</div>
    </div>
 
    <a href="orders.html">
      <button class="place-order-button button-primary">
        Place your order
      </button>
    </a>
    
  `;

  document.querySelector(".js-payment-summary").innerHTML = htmlPaymentSummary;
}
