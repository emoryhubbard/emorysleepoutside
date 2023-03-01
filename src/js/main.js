import ExternalServices from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';
import { qs, loadHeaderFooter } from './utils.mjs';

let externalServices = new ExternalServices('tents');
let pList = new ProductList('tents', externalServices, qs(".product-list"));
pList.init();
loadHeaderFooter();
