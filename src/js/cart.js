import { toggle, qs, getLocalStorage, loadHeaderFooter } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  console.log(cartItems);
  if (cartItems != null) {
    renderProducts(cartItems);
    renderTotal(cartItems);
    toggle(".cart-footer", "hide");
  }
  else {
    qs(".product-list").innerHTML = "Cart is currently empty.";
  }
}

function renderProducts(cartItems) {
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  qs(".product-list").innerHTML = htmlItems.join("");
}

function renderTotal(cartItems) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.FinalPrice, 0);
  qs(".total").innerHTML = `$${total}`;
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
loadHeaderFooter();
