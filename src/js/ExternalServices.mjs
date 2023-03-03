const baseURL = import.meta.env.VITE_SERVER_URL;
const checkoutURL = import.meta.env.VITE_CHECKOUT_URL;

async function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw {
      name: 'servicesError',
      message: await res.json()
    }
  }
}

export default class ExternalServices {
  constructor() {
  //this.category = category;
  //this.path = `../json/${this.category}.json`;
  //this.path = `https://emoryhubbard.github.io/emorysleepoutside/src/public/json/${this.category}.json`; //netlify had trouble finding json
  }
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(id) {
    const response = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(response);
    console.log(data.Result);
    return data.Result;
  }
  async checkout(payload) {
    const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
  }

  const response = await fetch(checkoutURL, options);
  const resJson = await convertToJson(response);
  }
}
