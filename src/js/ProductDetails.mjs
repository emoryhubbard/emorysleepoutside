import { qs, getLocalStorage, setLocalStorage } from "./utils.mjs"
import ExternalServices from "./ExternalServices.mjs"

export default class ProductDetails {
    constructor(id, category) {
        this.id = id;
        this.category = category; //So we know where the json file is. 
        this.product = {};        //Why not initialize it here?
    }                             //because findProductById returns
                                  //a promise if we don't wait
    //wait for findProductId to return a proper response
    async init() {
        let pData = new ExternalServices(this.category);
        const product = await pData.findProductById(this.id);
        console.log(product.Image);
      //product.Image = "https://emoryhubbard.github.io/emorysleepoutside/src/public" + product.Image.slice(2); //netlify had trouble finding images
        this.product = product;
        console.log(product.Image);

        this.renderProductDetails();
        qs("#addToCart").addEventListener("click", this.addToCart.bind(this));
    }
    addToCart() {
        let items = getLocalStorage("so-cart");
        if (items == null) {    //if empty, make a new list
          items = [];
        }
        items.push(this.product);
        setLocalStorage("so-cart", items);
    }
    renderProductDetails() {
        let p = this.product;
        console.log(p.Image);
        qs(".product-detail").innerHTML =
        `<h3 class="brand">${p.Brand.Name}</h3>

        <h2 class="divider">${p.NameWithoutBrand}</h2>

        <img
          class="divider product-image"
          src="${p.Images.PrimaryLarge}"
          alt="${p.NameWithoutBrand}"
        />

        <p class="product-card__price">$${p.ListPrice}</p>

        <p class="product__color color-name">${p.Colors[0].ColorName}</p>

        <p class="product__description">${p.DescriptionHtmlSimple}</p>

        <div class="product-detail__add">
          <button id="addToCart" data-id="${p.Id}">Add to Cart</button>
        </div>`;
        /*qs(".brand").innerHTML = p.Brand.Name;
        qs(".name-without-brand").innerHTML = p.NameWithoutBrand;
        qs(".product-image").src = p.Image;
        qs(".list-price").innerHTML = "$" + p.ListPrice;
        let colorObject = p.Colors[0];
        qs(".color-name").innerHTML = colorObject.ColorName;
        qs(".description-html-simple").innerHTML = p.DescriptionHtmlSimple;    
        qs("#addToCart").setAttribute("data-id", p.Id);*/
    }
}