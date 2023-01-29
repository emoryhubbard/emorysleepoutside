import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

let productData = new ProductData('tent');
new ProductList('tents', productData, 'div');