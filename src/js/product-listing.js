import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { getParam, qs, loadHeaderFooter } from './utils.mjs';

const category = getParam('category');
const productData = new ProductData();
const pList = new ProductList(category, productData, qs(".product-list"));
pList.init();
loadHeaderFooter();