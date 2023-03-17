import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

console.log("Orders: ", getLocalStorage("orders"))
loadHeaderFooter();