import UserController from "../controllers/UserController"

export function getCurrentUser(id: number) {
    UserController.getCurrentUser(id);
}