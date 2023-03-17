const baseURL = import.meta.env.VITE_SERVER_URL;

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

    const response = await fetch(baseURL + 'checkout', options);
    const resJson = await convertToJson(response);
  }
  async loginRequest(credentials) {
    const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }
    const response = await fetch(baseURL + 'login', options);
    const resJson = await convertToJson(response);
    const token = resJson['accessToken'];
    return token;
  }
  async getOrders(token) {
    const options = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }

    const response = await fetch(baseURL + 'orders', options);
    const orders = await convertToJson(response);
    return orders;
  }
}

/*
Old URLs:
const baseURL = import.meta.env.VITE_SERVER_URL;
const checkoutURL = import.meta.env.VITE_CHECKOUT_URL;
const loginURL = import.meta.env.VITE_LOGIN_URL;
const ordersURL = import.meta.env.VITE_ORDERS_URL;

VITE_SERVER_URL=http://server-nodejs.cit.byui.edu:3000/
VITE_CHECKOUT_URL=http://server-nodejs.cit.byui.edu:3000/checkout
VITE_LOGIN_URL=http://server-nodejs.cit.byui.edu:3000/login
VITE_ORDERS_URL=http://server-nodejs.cit.byui.edu:3000/orders

The environment variable on Netlify for VITE_SERVER_URL will
be set differently, to https://wdd330-backend.onrender.com/,
since Netlify only works for back-ends with the https connection.
*/



