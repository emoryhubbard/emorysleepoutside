import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { qs, loadHeaderFooter } from './utils.mjs';

let productData = new ProductData('tents');
let pList = new ProductList('tents', productData, qs(".product-list"));
pList.init();
loadHeaderFooter();
