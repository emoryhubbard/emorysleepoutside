import { toggle, qs, getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs"

function packageItem(item) {
    return {
        id: item.Id,
        name: item.Name,
        price: item.FinalPrice,
        quantity: 1
    };
}
function packageItems(items) {
    const cartItems = getLocalStorage("so-cart");
    return cartItems.map(packageItem);
}
function jsonifyForm(form) {
    const formData = new FormData(form);
    const json = {};
    for (const [key, value] of formData)
        json[key] = value;
    return json;
}
export default class CheckoutProcess {
    constructor(cartItems) {
        this.externalServices = new ExternalServices();
        this.cartItems = cartItems;
    }
    subtotal() {
        return this.cartItems.reduce(
            (sum, item) => sum + item.FinalPrice, 0);
    }
    shipping() {
        return 10 + (this.cartItems.length - 1) * 2;
    }
    tax() {
        return 0.06 * this.subtotal();
    }
    total() {
        return this.subtotal() + this.tax()
            + this.shipping();
    }
    renderSubtotal() {
          qs(".subtotal").innerHTML = `$${this.subtotal().toFixed(2)}`;
    }
    renderShipping() {
        qs(".shipping").innerHTML = `$${this.shipping().toFixed(2)}`;
    }
    renderTax() {
        qs(".tax").innerHTML = `$${this.tax().toFixed(2)}`;
    }
    renderTotal() {
        qs(".total").innerHTML = `$${this.total().toFixed(2)}`;
    }
    async checkout(form) {
        const payload = jsonifyForm(form);
        payload.orderDate = new Date().toISOString();
        payload.items = packageItems(),
        payload.orderTotal = this.total().toFixed(2),
        payload.shipping = this.shipping(),
        payload.tax = this.tax().toFixed(2)
        console.log(payload);

        this.externalServices.checkout(payload);
    }
}


