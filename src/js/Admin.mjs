import { setLocalStorage, jsonifyForm, setClick, loadTemplate, renderTemplate, qs, alertMessage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs"

export default class Admin {
    constructor() {
        this.token = null;
        this.services = new ExternalServices();
    }
    async login(credentials, callback = null) {
        try {
            this.token = await this.services.loginRequest(credentials);
            console.log("token: ", this.token);
            if (this.token == null)
                throw { name: 'credentialsError' }
            if (callback != null)
                await callback();
        }
        catch (err) {
            this.loginFailure(err);
        }
    }
    async showLogin() {
        const loginForm = await loadTemplate(`../templates/login-form.html`);
        
        renderTemplate({element: qs("main"), template: loginForm, clear: true});
        setClick(".submit-button", this.submitListener.bind(this));
    }
    submitListener(e) {
        e.preventDefault();
        const credentials = jsonifyForm(document.forms.login);
        console.log("credentials: ", credentials);
        this.login(credentials, this.loginSuccess.bind(this));
    }
    async loginSuccess() {
        console.log("This.token in loginSuccess(): ", this.token);
        const orders = await this.services.getOrders(this.token);
        setLocalStorage("orders", orders);
        window.location.replace("/admin/login-success.html");
    }
    loginFailure(err) {
        console.log(err.message);
        if (err.name == "servicesError") {
            for (const key in err.message)
                alertMessage(err.message[key]);
        } else if (err.name == "credentialsError") {
            alertMessage("Invalid credentials. Please try again.");
        }
        else {  
            alertMessage("Failed to log in. Please try again later.");
        }
    }
}