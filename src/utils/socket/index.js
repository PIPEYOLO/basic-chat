import io from "socket.io-client";




export const socket = io(env_.BACKEND_SERVER_ORIGIN, {
    autoConnect: true,
    transports: ["websocket"],
});

console.log(env_.BACKEND_SERVER_ORIGIN);

