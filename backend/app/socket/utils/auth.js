import { Socket } from "socket.io";
import { UnsuccessfulResult } from "../../services/results/index.js";
import { UNVALID_ROOM_JOIN_DATA_ERROR } from "../../services/errors/index.js";


/**
 * 
 * @param {Socket} socket 
 * @param {Object} roomAuth 
 */
export function setSocketRoomData(socket, roomAuthData) {
    const { name, room } = roomAuthData;

    if(typeof name !== "string" || name.length === 0 || name.length > 100) {
        throw new UnsuccessfulResult({ error: UNVALID_ROOM_JOIN_DATA_ERROR, info: "name of the user must be a string of 0-100 characters"});
    };

    if(typeof room !== "string" || room.length === 0 || room.length > 100) {
        throw new UnsuccessfulResult({ error: UNVALID_ROOM_JOIN_DATA_ERROR, info: "room must be a string of 0-100 characters"});
    };
    
    socket.handshake.auth.roomData = {
        id: crypto.randomUUID(),
        name: name, 
        room: room
    };

    return socket.handshake.auth.roomData;
}


/**
 * 
 * @param {Socket} socket 
 */
export function unsetSocketRoomData(socket) {
    delete socket.handshake.auth.roomData;
}


/**
 * 
 * @param {Socket} socket 
 * @returns 
 */
export function getSocketRoomData(socket) {
    return socket.handshake.auth.roomData;
};


