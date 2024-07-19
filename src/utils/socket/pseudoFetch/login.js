import { pseudoFetch } from ".";


const { SOCKETIO_EVENT_AUTH } = env_;
export async function login(payload) {
    const result = await pseudoFetch(SOCKETIO_EVENT_AUTH, payload);
    return result;
}