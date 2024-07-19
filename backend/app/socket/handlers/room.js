import { Socket } from "socket.io";
import globalConfig from "../../../config/index.js";
import { UNVALID_ROOM_JOIN_DATA_ERROR, UNVALID_ROOM_MESSAGE_DATA_ERROR } from "../../services/errors/index.js";
import { SuccessfulResult, UnsuccessfulResult } from "../../services/results/index.js";
import { joinRoomAs, leaveJoinedRoom, leaveRoom } from "../utils/room.js";
import Message from "../../services/models/Message/index.js";
import { getSocketRoomData, setSocketRoomData } from "../utils/auth.js";

const { SOCKETIO_EVENT_ROOM_JOIN, SOCKETIO_EVENT_ROOM_LEAVE, SOCKETIO_EVENT_ROOM_MESSAGE } = globalConfig;

/**
 * 
 * @param {Socket} socket 
 * 
 */
export default function handleRoomEvents(socket) {


    // Events and MiddleWares
    socket.on(SOCKETIO_EVENT_ROOM_JOIN, data => {
        console.log(SOCKETIO_EVENT_ROOM_JOIN, data);
        if(typeof data !== "object") {
            return new UnsuccessfulResult({ error: UNVALID_ROOM_JOIN_DATA_ERROR, info: "data must be an object"}).sendToSocket(socket, SOCKETIO_EVENT_ROOM_JOIN);
        };
        
        const { room, name } = data;

        leaveJoinedRoom(socket); // we leave all the rooms that socket is in. (IT MUST BE ONE because every time it joins a room it has to leave the previous one)

        return joinRoomAs(socket, room, name); // we join the room desired
    });

    socket.on(SOCKETIO_EVENT_ROOM_LEAVE, data => {
        leaveRoom(socket, socket.rooms[socket.rooms.size - 1]); // we leave the room we are joined
    });



    socket.on(SOCKETIO_EVENT_ROOM_MESSAGE, data => {
        console.log(data);
        if(typeof data !== "object") {
            return new UnsuccessfulResult({ error: UNVALID_ROOM_MESSAGE_DATA_ERROR, info: "data must be an object"}).sendToSocket(socket, SOCKETIO_EVENT_ROOM_MESSAGE);
        };

        const messageDataProvided = data.message;

        let builtMessage;
        try {
            console.log(messageDataProvided.contents)
            builtMessage = new Message({...messageDataProvided, userSocket: socket}); // we validate and build the message
        }
        catch(err) { // this is am unsuccessfull message result
            const unsuccessfulResult = err; 
            console.log(err);
            unsuccessfulResult.addData({ message: messageDataProvided}); // 
            return unsuccessfulResult.sendToSocket(socket, SOCKETIO_EVENT_ROOM_MESSAGE);
        }

        console.log(SOCKETIO_EVENT_ROOM_MESSAGE, { message: builtMessage });
        socket.to(builtMessage.getRoom()).except(socket.id).emit(SOCKETIO_EVENT_ROOM_MESSAGE, { message: builtMessage }); // send the message to the room socketss

        return new SuccessfulResult({ data: { message: builtMessage.getForEmitter() } }).sendToSocket(socket, SOCKETIO_EVENT_ROOM_MESSAGE);
    });

}