import { getParam } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";

console.log("debug", "product.js is running");

let id = getParam("product");
let product = new ProductDetails(id, "tents");
product.init();




