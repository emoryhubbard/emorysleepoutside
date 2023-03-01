import { toggle, qs, getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import { renderSubtotal, renderShipping, renderTax, renderTotal } from "./CheckoutProcess.mjs";

function renderOrderSummary() {
    const cartItems = getLocalStorage("so-cart");
    console.log(cartItems);
    if (cartItems != null) {
      renderSubtotal(cartItems);
      renderShipping(cartItems);
      renderTax(cartItems);
      renderTotal(cartItems);
    }
    else {
      qs(".total").innerHTML = "Cart is currently empty.";
    }
  }

console.log("debug", "checkout.js is running");

renderOrderSummary();
loadHeaderFooter();