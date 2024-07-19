import { pseudoFetch } from ".";

const { SOCKETIO_EVENT_ROOM_JOIN, SOCKETIO_EVENT_ROOM_MESSAGE, SOCKETIO_EVENT_ROOM_LEAVE} = env_;


export async function joinRoom(info) {
    const result = await pseudoFetch(SOCKETIO_EVENT_ROOM_JOIN, info);
    return result;
};


export async function messageToRoom(info) {
    const result = await pseudoFetch(SOCKETIO_EVENT_ROOM_MESSAGE, info);
    return result;
}


export async function leaveRoom() {
    const result = await pseudoFetch(SOCKETIO_EVENT_ROOM_LEAVE);
    return result;
};


// export async function createRoom(roomName) {
//     const result = await pseudoFetch(SOCKETIO_EVENT_ROOM_CREATE, {name: roomName});
//     return result;
// };

