import { qs, getLocalStorage, setLocalStorage } from "./utils.mjs"
import ProductData from "./ProductData.mjs"

export default class ProductDetails {
    constructor(id, category) {
        this.id = id;
        this.category = category; //So we know where the json file is. 
        this.product = {};        //Why not initialize it here?
    }                             //because findProductById returns
                                  //a promise if we don't wait
    //wait for findProductId to return a proper response
    async init() {
        let pData = new ProductData(this.category);
        const product = await pData.findProductById(this.id);
        this.product = product;
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

        qs(".brand").innerHTML = p.Brand.Name;
        qs(".name-without-brand").innerHTML = p.NameWithoutBrand;
        qs(".product-image").src = p.Image;
        qs(".list-price").innerHTML = "$" + p.ListPrice;
        let colorObject = p.Colors[0];
        qs(".color-name").innerHTML = colorObject.ColorName;
        qs(".description-html-simple").innerHTML = p.DescriptionHtmlSimple;    
        qs("#addToCart").setAttribute("data-id", p.Id);
    }
}