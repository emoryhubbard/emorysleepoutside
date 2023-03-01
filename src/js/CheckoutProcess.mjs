import { toggle, qs, getLocalStorage, loadHeaderFooter } from "./utils.mjs";

export function renderSubtotal(cartItems) {
    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.FinalPrice, 0);
      qs(".subtotal").innerHTML = `$${subtotal.toFixed(2)}`;
      return subtotal;
}
export function renderShipping(cartItems) {
    let shipping = 10 + (cartItems.length - 1) * 2;
    qs(".shipping").innerHTML = `$${shipping.toFixed(2)}`;
    return shipping;
}
export function renderTax(cartItems) {
    const tax =  0.06 * renderSubtotal(cartItems);
    qs(".tax").innerHTML = `$${tax.toFixed(2)}`;
    return tax;
}
export function renderTotal(cartItems) {
    const total = renderSubtotal(cartItems) +
        renderTax(cartItems) + renderShipping(cartItems);
    qs(".total").innerHTML = `$${total.toFixed(2)}`;
    return total;
}