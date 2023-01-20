function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category; //netlify had trouble finding json
    this.path = `https://emoryhubbard.github.io/emorysleepoutside/src/json/${this.category}.json`;
//    this.path = `../json/${this.category}.json`;
    console.log(this.category);
    console.log(this.path);
  }
  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }
  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}
