import { getLocalUser } from "./authServices";

export default function authHeader() {
    const user = getLocalUser();

    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token };
    } else {
        return {};
    }
}