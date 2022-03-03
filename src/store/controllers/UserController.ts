import { Axios, GET_USER } from "../../utils/requestUtils"
import UserStore from "../datastores/UserStore";

let axios = Axios.default;

class UserController {
    async getCurrentUser(id: number) {
        console.log("UserController: getCurrentUser");
        const user = await axios.get(`${GET_USER}${id}`);
        console.log("UserController: getCurrentUser received", user);
        UserStore.update(user.data);
        return UserStore;
    }
}


export default new UserController();
