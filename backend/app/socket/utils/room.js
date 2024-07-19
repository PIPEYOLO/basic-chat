import { Socket } from "socket.io";
import { SuccessfulResult, UnsuccessfulResult } from "../../services/results/index.js";
import { UNKWONW_ERROR } from "../../services/errors/index.js";
import globalConfig from "../../../config/index.js";

import {getSocketRoomData, setSocketRoomData, unsetSocketRoomData } from "./auth.js";



const { SOCKETIO_EVENT_ROOM_LEAVE, SOCKETIO_EVENT_ROOM_JOIN } = globalConfig;

/**
 * 
 * @param {Socket} socket 
 * @param {String} room 
 */
export function leaveRoom(socket, room) {

    try {
        socket.to(room).except(socket.id).emit(SOCKETIO_EVENT_ROOM_LEAVE, { user: getSocketRoomData(socket)}); // notify the users of that room that the user leaves
        socket.leave(room); // socket leaves the room
        unsetSocketRoomData(socket);
    }
    catch(err) {
        return new UnsuccessfulResult({ error: UNKWONW_ERROR, info: "socket could not leave the room"});
    }
    

    return new SuccessfulResult({noData: true}).sendToSocket(socket, SOCKETIO_EVENT_ROOM_LEAVE);
}


/**
 * 
 * @param {Socket} socket 
 */
export function leaveJoinedRoom(socket) {
    const socketRoomData = getSocketRoomData(socket);
    if(socketRoomData == undefined) return;
    const { room } = socketRoomData;
    leaveRoom(socket, room);

}

/**
 * 
 * @param {Socket} socket 
 * @param {String} room 
 */
export async function joinRoomAs(socket, room, name) {


    let userJoinInfo;
    let roomSockets;
    try{    
        roomSockets = await socket.to(room).fetchSockets();
        await socket.join(room); // socket joinst the room
        userJoinInfo = setSocketRoomData(socket, { room, name }); // set the user room data
        socket.to(room).except(socket.id).emit(SOCKETIO_EVENT_ROOM_JOIN, { user: userJoinInfo }); // notify the memebers that new user just joined with new user roomdata
    }
    catch(err) {
        if(err instanceof UnsuccessfulResult) {
            return err.sendToSocket(socket, SOCKETIO_EVENT_ROOM_JOIN);
        }
        return new UnsuccessfulResult({ error: UNKWONW_ERROR, info: "Could not join the room"}).sendToSocket(socket, SOCKETIO_EVENT_ROOM_JOIN);
    }

    const roomUsersInfo = roomSockets.map(roomSocket => ( { user: getSocketRoomData(roomSocket)} ) ); // obtain the room sockets info
    
    return new SuccessfulResult({data: { user: userJoinInfo, room }}).sendToSocket(socket, SOCKETIO_EVENT_ROOM_JOIN); // send the result to the user with the members info and the user roomdata
    
}