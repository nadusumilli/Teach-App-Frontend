export const parseJwt = (token: string | null) => {
    if (!token) { return; }
    const base64Url = token && token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

export const isValidSession = (token: string | null) => {
    if (!token) {
        return false;
    }
    const parsedToken = parseJwt(token);
    const now = new Date().getTime() / 1000;
    if (parsedToken.exp < now) {
        return false;
    }
    return true;
}