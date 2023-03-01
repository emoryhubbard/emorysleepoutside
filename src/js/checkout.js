import { toggle, qs, getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

function renderOrderSummary(cp) {
    const cartItems = getLocalStorage("so-cart");
    console.log(cartItems);
    if (cartItems != null) {
      cp.renderSubtotal();
      cp.renderShipping();
      cp.renderTax();
      cp.renderTotal();
    }
    else {
      qs(".total").innerHTML = "Cart is currently empty.";
    }
  }

function addSubmitListener(cp) {
  document.forms.order.addEventListener("submit", function(e) {
    e.preventDefault();
    cp.checkout();
  });
}


console.log("debug", "checkout.js is running");

const cartItems = getLocalStorage("so-cart");
const cp = new CheckoutProcess(cartItems);
addSubmitListener(cp);
renderOrderSummary(cp);
loadHeaderFooter();