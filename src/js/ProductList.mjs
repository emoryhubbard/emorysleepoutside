import { renderList } from './utils.mjs';

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init() {
        let products = await this.dataSource.getData();
        products = products.filter(this.isValid); // we didn't receive images for some products, and the reading said to only display 4 products anyway, so these are skipped

        renderList({templateFunction: this.productCardTemplate,
            element: this.listElement, list: products});
        //this.renderList(products);
    }
    isValid(product) {
        if (product.Id != "989CG" && product.Id != "880RT")
            return true;
    }
    renderList(products) {
        products.map(this.renderOneProduct.bind(this));
    }
    renderOneProduct(product) {
        if (product.Id == "989CG" || product.Id == "880RT") // we didn't receive images for some products, and the reading said to only display 4 products anyway, so these are skipped
            return;
        this.listElement.innerHTML += this.productCardTemplate(product);
    }
    productCardTemplate(p) {
        return `<li class="product-card">
        <a href="product-pages/index.html?product=${p.Id}">
        <img
          src="${p.Image}"
          alt="${p.NameWithoutBrand}"
        />
        <h3 class="card__brand">${p.Brand.Name}</h3>
        <h2 class="card__name">
          ${p.NameWithoutBrand}
        </h2>
        <p class="product-card__price">$${p.ListPrice}</p></a>
      </li>`;
    }
}