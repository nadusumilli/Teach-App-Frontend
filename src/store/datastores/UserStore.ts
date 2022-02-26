import { makeObservable, observable, action } from 'mobx';

function parseJwt(token: String | null) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

console.log("Parsed token", parseJwt(localStorage.getItem('token')));

type updateDefintion = {
    [key: string]: any
    firstName: string | undefined;
    lastName: string | undefined;
    username: string | undefined;
    email: string | undefined;
    // role: string | undefined;
}

class UserStore {
    [key: string]: any
    public firstName?: string = "";
    public lastName?: string = "";
    public username?= "";
    public email?: string = "";
    // public role?: string = "";

    constructor() {
        makeObservable(this, {
            firstName: observable,
            lastName: observable,
            username: observable,
            email: observable,
            // role: observable,
            update: action,
        })
    }

    set token(token) {
        if (!token) {
            return;
        }

        localStorage.setItem("token", token);
    }

    get token() {
        return localStorage.getItem("token");
    }

    get isLoggedIn() {
        // console.log(this._id, Boolean(this._id), typeof this._id);
        return Boolean(this.email);
    }


    update(definition: updateDefintion) {
        console.log("### update called", definition);
        const whiteListKeys = ['firstName', 'username', 'lastName'];
        whiteListKeys.forEach((key) => {
            if (definition[key]) {
                this[key] = definition[key];
            }
        });
        definition['lastName'] && (this.lastName = definition['lastName']);
        definition['username'] && (this.username = definition['username']);
        console.log("### update called done", this.firstName);
    }

    logout() {
        localStorage.removeItem("user");
    }
}

export default new UserStore();