import ExternalServices from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';
import { getParam, qs, loadHeaderFooter } from './utils.mjs';

const category = getParam('category');
const externalServices = new ExternalServices();
const pList = new ProductList(category, externalServices, qs(".product-list"));
pList.init();
loadHeaderFooter();