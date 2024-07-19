import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { addMessage, messageToRoom } from "../../store/slices/room/index.js";

export default function useMessage() {

    const dispatch = useDispatch();
    const prepareMessage = useCallback((message)=> {
        return {
            localId: crypto.randomUUID(),
            ...message
        }
    }, []);

    const sendMessage = useCallback((contents)=> {
        
        const messagePrepared = prepareMessage({ contents, shipState: "shipping" });
        dispatch(addMessage(messagePrepared));
        dispatch(messageToRoom(messagePrepared));

    }, []);

    const receiveMessage = useCallback((message) => {
        const messagePrepared = prepareMessage(message);
        dispatch(addMessage(messagePrepared));
    }, [])

    return {
        sendMessage, receiveMessage
    }
}