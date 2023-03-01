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
        const d = new Date();
        const date = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
        const time = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
        const ms = `${d.getMilliseconds()}`;
        const fullDate = date + "T" + time + "." + ms + "Z";
        const payload = {
            orderDate: fullDate,
            fname: qs('input[name="firstName"]').value,
            lname: qs('input[name="lastName"]').value,
            street: qs('input[name="street"]').value,
            city: qs('input[name="city"]').value,
            state: qs('input[name="state"]').value,
            zip: qs('input[name="zip"]').value,
            cardNumber: qs('input[name="cardNumber"]').value,
            expiration: qs('input[name="expiration"]').value,
            code: qs('input[name="securityCode"]').value,
            items: packageItems(),
            orderTotal: this.total().toFixed(2),
            shipping: this.shipping(),
            tax: this.tax().toFixed(2)
        }
        console.log(payload);

        this.externalServices.checkout(payload);
    }
}


