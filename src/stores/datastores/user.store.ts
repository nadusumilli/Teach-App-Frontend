import { makeAutoObservable } from 'mobx';
import UserInterface from "../models/User"
import { isValidSession, parseJwt } from "../../utils/authUtils"
import { UserService } from "../services/user.service"
import { LoginRequest } from '../models/requests/login.interface';
import { RegisterRequest } from '../models/requests/register.interface';

export class UserStoreImpl {
    [key: string]: any
    private authenticated = false
    private last_name?: string = ''
    private first_name?: string = ''
    private username?: string = ''
    private email?: string = ''

    constructor(private readonly userService: UserService) {
        makeAutoObservable(this);
        this.verifyAuth();
    }

    isAuthenticated() {
        return this.authenticated;
    }

    private setAuthenticated(authenticated: boolean) {
        this.authenticated = authenticated;
    }

    private get token() {
        return localStorage.getItem('access_token');
    }

    verifyAuth() {
        this.authenticated = isValidSession(this.token);
        if (this.authenticated) {
            this.update(parseJwt(this.token))
        }
        return true;
    }

    getUsername() {
        return this.username;
    }

    update(definition: UserInterface) {
        const whiteListKeys = ['first_name', 'username', 'last_name', 'email'];
        whiteListKeys.forEach((key) => {
            if (definition[key]) {
                this[key] = definition[key];
            }
        });
        console.log("### user update called with", definition);
    }

    async login(loginRequest: LoginRequest) {
        try {
            const token_payload = await this.userService.login(loginRequest);
            localStorage.setItem('access_token', token_payload.access);
            localStorage.setItem('refresh_token', token_payload.refresh);
            this.update(parseJwt(token_payload.access))
            this.setAuthenticated(isValidSession(token_payload.access.toString()))
            return true;
        } catch (error) {
            console.log(error)
            this.setAuthenticated(false);
            return false;
        }
    }

    async register(registerRequest: RegisterRequest) {
        try {
            const response = await this.userService.register(registerRequest);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    logout() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        this.verifyAuth();
        return true;
    }
}