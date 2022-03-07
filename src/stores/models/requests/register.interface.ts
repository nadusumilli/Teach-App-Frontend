export interface RegisterRequest {
    readonly first_name: string,
    readonly last_name: string,
    readonly username: string,
    readonly email: string,
    readonly password: string,
    readonly confirm_password: string
}