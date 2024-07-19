import { fetchServer } from ".";


export function login(credentials) {
    return fetchServer({path: "/login", method: "post", body: credentials});
}