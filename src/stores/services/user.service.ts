import { Axios, LOGIN_USER, REGISTER_USER } from "../../utils/requestUtils"
import { LoginRequest } from "../models/requests/login.interface";
import { RegisterRequest } from "../models/requests/register.interface";
const axios = Axios.default;

class UserService {
    async login(loginRequest: LoginRequest) {
        const response = await axios.post(LOGIN_USER, loginRequest);

        if (response.status !== 200) {
            throw new Error('Login has Failed.')
        }
        console.log(response);
        return response.data;
    }

    async register(registerRequest: RegisterRequest) {
        const response = await axios.post(REGISTER_USER, registerRequest);
        console.log(response);
        if (response.status !== 201) {
            throw new Error('Registration has Failed.')
        }
        return response.data;
    }
}

export { UserService }

