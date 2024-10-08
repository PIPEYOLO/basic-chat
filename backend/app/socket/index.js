import { Server } from "socket.io";
import configuration from "../../config/index.js";
import handleRoomEvents from "./handlers/room.js";

const { ALLOWED_ORIGINS, SOCKETIO_MAX_PAYLOAD_SIZE } = configuration




export default function linkSocketIoWithServer(server) {
    
    const io = new Server(server, {
        cors: {
            credentials: true, // allow cookies
            origin: ALLOWED_ORIGINS,
        },
        transports: ["polling", "websocket"],
        maxHttpBufferSize: parseInt(SOCKETIO_MAX_PAYLOAD_SIZE),
    });

    io.on("connection", socket => {
        console.log(`connected socket with _id`, socket.id);

        
        handleRoomEvents(socket);
        // socket.use(SOCKETIO_EVENT_AUTH, authenticationRequired(socket));
    });
    

    return io
}