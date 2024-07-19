import { socket } from "../utils/socket";


const { SOCKETIO_EVENT_AUTH, SOCKETIO_EVENT_CLOSE_SESSION } = env_;

export default function useSocket() {


    return { socket };
}