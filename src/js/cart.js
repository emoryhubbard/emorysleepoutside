import { qs, getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  console.log(cartItems);
  if (cartItems != null) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    qs(".product-list").innerHTML = htmlItems.join("");
  }
  else {
    qs(".product-list").innerHTML = "Cart is currently empty.";
  }
}

function cartItemTemplate(item) {
  console.log(item.Image);
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
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
