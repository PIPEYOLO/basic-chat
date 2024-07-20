import { Socket } from "socket.io";

export class StandarizedError {
    constructor({code, message, status}) {

        if(StandarizedError.#isCallableNow === false) throw new Error(`${StandarizedError.name} is only callable in its module`)

        if(typeof message !== "string") throw new Error(`message must be a string`);
        if(typeof code !== "string") throw new Error(`code must be a string`);
        if(typeof status !== "number") throw new Error(`status must be a number`);
        this.code = code;
        this.message = message;
        this.status = status;

        Object.freeze(this);
    }

    static #isCallableNow = true;
    static blockClass() {
        this.#isCallableNow = false;
    }
}



// Auth

export const USER_ROOM_AUTHENTICATION_REQUIRED_ERROR = new StandarizedError({message: "user has to join a room to send a message", status: 401, code: "USER_ROOM_AUTHENTICATION_REQUIRED"});

// Data: 
export const UNVALID_ROOM_JOIN_DATA_ERROR = new StandarizedError({message: "data provided to join room is unvalid", status: 401, code: "UNVALID_ROOM_JOIN_DATA"});

export const UNVALID_ROOM_MESSAGE_DATA_ERROR = new StandarizedError({message: "data provided to message is unvalid", status: 401, code: "UNVALID_ROOM_MESSAGE_DATA"});
export const UNVALID_MESSAGE_DATA_ERROR = new StandarizedError({message: "data for message is unvalid", status: 401, code: "UNVALID_MESSAGE_DATA"});


// Throttling:

export const TO_MANY_EMISSIONS_ERROR = new StandarizedError({message: "payload emission points were reached, please wait to send the next emission", status: 429, code: "TO_MANY_EMISSIONS"});


// Unknown:
export const UNKWONW_ERROR = new StandarizedError({message: "failed to do action", status: 500, code: "UNKWONW"});



StandarizedError.blockClass(); // We unable this class to construct

