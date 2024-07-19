import { Socket } from "socket.io";
import { UNVALID_MESSAGE_DATA_ERROR, USER_ROOM_AUTHENTICATION_REQUIRED_ERROR } from "../../errors/index.js";
import { UnsuccessfulResult } from "../../results/index.js";
import { getSocketRoomData } from "../../../socket/utils/auth.js";

export default class Message {
    #localId;
    constructor({ contents, userSocket, localId }) {
        this.id = crypto.randomUUID();
        this.user = Message.validateUserSocketCanSendMessage(userSocket);
        this.contents = Message.validateContents(contents);
        this.date = new Date().toISOString(); // Adding the date in ISO format

        this.#localId = localId;
    }

    getRoom() {
        return this.user.room;
    }


    getForEmitter() {
        const toReturn = { ...this, localId: this.#localId };
        delete toReturn.contents;
        return toReturn;
    }

    static validateUserSocketCanSendMessage(userSocket) {
        if(userSocket instanceof Socket === false) throw new Error(`userSocket must be a ${Socket.name}`);
        const authData = getSocketRoomData(userSocket);
        if(authData == undefined) throw new UnsuccessfulResult({ error: USER_ROOM_AUTHENTICATION_REQUIRED_ERROR, info: "user has to join a room to send a messsage"});
        
        return authData; 
    }

    // Validate the contents array
    static validateContents(contents) {
        console.log(contents);
        if (!Array.isArray(contents)) {
            const error = new UnsuccessfulResult({ error: UNVALID_MESSAGE_DATA_ERROR, info: `message.contents must be an array`});
            throw error;
        }
        if (contents.length === 0) {
            const error = new UnsuccessfulResult({ error: UNVALID_MESSAGE_DATA_ERROR, info: `message.contents must have at least one content`});
            throw error;
        };

        if (contents.length > 5) {
            const error = new UnsuccessfulResult({ error: UNVALID_MESSAGE_DATA_ERROR, info: `message.contents must have at most 5 content`});
            throw error;
        };

        let textContents = 0;
        contents.forEach(content => {
            console.log("content", content);
            if(textContents === 2) {
                const error = new UnsuccessfulResult({ error: UNVALID_MESSAGE_DATA_ERROR, info: `message.contents must have at most 1 text content`});
                throw error;
            }
            if (typeof content !== "object") {
                const error = new UnsuccessfulResult({ error: UNVALID_MESSAGE_DATA_ERROR, info: `message.contents[] must be an object`})
                throw error;
            }
            if (typeof content.type !== `string`) {
                const error = new UnsuccessfulResult({ error: UNVALID_MESSAGE_DATA_ERROR, info: `message.contents[].type must be a string`})
                throw error;
            }

            if (content.type === `text/plain`) {
                if (typeof content.content !== `string`) {
                    const error = new UnsuccessfulResult({ error: UNVALID_MESSAGE_DATA_ERROR, info: `message.contents[].content must be a string for text/plain type`});
                    throw error;
                }
                textContents++;
            }

            if ((content.type === `video` || content.type === `image`) && !(content.content instanceof Buffer)) {
                const error = new UnsuccessfulResult({ error: UNVALID_MESSAGE_DATA_ERROR, info: `Content must be a Buffer for video or image types`});
                throw error;
            }
        });
        return contents;
    }
}
