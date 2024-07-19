
const ROOM_DATA_KEY = "room_data";

export function getRoomDataFromStorage() {
    return JSON.parse(localStorage.getItem(ROOM_DATA_KEY));
};

export function setRoomDataInStorage(roomData) {
    localStorage.setItem(ROOM_DATA_KEY, JSON.stringify(roomData));
}

export function unsetRoomDataInStorage() {
    localStorage.removeItem(ROOM_DATA_KEY);
}