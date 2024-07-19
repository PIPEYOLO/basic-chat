
const { WEB_ROUTE_JOIN_ROOM } = env_
export function getRoomLink(roomName) {
    return `${origin}${WEB_ROUTE_JOIN_ROOM}?room=${roomName}`;
};


