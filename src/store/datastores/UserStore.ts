import { makeObservable, observable, action } from 'mobx';

type updateDefintion = {
    [key: string]: any
    first_name: string | undefined;
    last_name: string | undefined;
    username: string | undefined;
    email: string | undefined;
    // role: string | undefined;
}

class UserStore {
    [key: string]: any
    public first_name?: string = "";
    public last_name?: string = "";
    public username?= "";
    public email?: string = "";
    // public role?: string = "";

    constructor() {
        makeObservable(this, {
            first_name: observable,
            last_name: observable,
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

        localStorage.setItem("token", JSON.stringify(token));
    }

    get token() {
        const token = localStorage.getItem('token') || '{}'
        return JSON.parse(token);
    }

    set id(id: number) {
        if (!id) {
            return;
        }
        localStorage.setItem('id', id.toString());
    }

    get id() {
        return Number(localStorage.getItem('id'));
    }

    get isLoggedIn() {
        return !!this.id;
    }


    update(definition: updateDefintion) {
        console.log("### update called", definition);
        const whiteListKeys = ['first_name', 'username', 'last_name', 'email'];
        whiteListKeys.forEach((key) => {
            if (definition[key]) {
                this[key] = definition[key];
            }
        });
        console.log("### update called done", this.first_name);
    }

    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem('isAvailable');
    }
}

export default new UserStore();