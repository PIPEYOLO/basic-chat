import { useSelector } from "react-redux"
import ChatMessage from "./ChatMessage";
import { useEffect, useRef } from "react";
import { selectMessagesOrdered } from "../../store/slices/room";
import useSocket from "../../hooks/useSocket";
import useMessage from "../../hooks/context/useMessage";
import FileViewer from "../Files/FileViewer";

const { SOCKETIO_EVENT_ROOM_MESSAGE } = env_;

export default function ChatSection() {
    const { socket } = useSocket();
    const { receiveMessage } = useMessage();
    const messages = useSelector(selectMessagesOrdered);

    const chatBoxRef = useRef();
    useEffect(()=> { // listen to chat messages
        console.warn("actibando", SOCKETIO_EVENT_ROOM_MESSAGE);
        socket.on(SOCKETIO_EVENT_ROOM_MESSAGE, data => {
            const { message } = data;
            console.warn("message received", message) ;
            receiveMessage(message);
        });

        return ()=> {
            socket.off(SOCKETIO_EVENT_ROOM_MESSAGE);
        };

    }, []);

    useEffect(()=> {// Auto scrooll
        if(chatBoxRef.current) {
            const maxScrollAt_Y = chatBoxRef.current.scrollHeight - chatBoxRef.current.offsetHeight;
            if(maxScrollAt_Y - chatBoxRef.current.scrollTop < 100) { // when user is seeing the last 100px of the chatBox
                chatBoxRef.current.scrollTo(0, maxScrollAt_Y); // auto scroll down
            } 
        };
    }, [messages]);


    useEffect(()=> {
        console.warn("message", messages);
    }, [messages]);

    
    
    return (
        <div className="relative w-full grow">
            <div key={"chatBox"} ref={chatBoxRef} className="absolute w-full h-full flex flex-col p-2 overflow-x-hidden scrollbar-1">
                {
                    messages.map(message => (<ChatMessage {...message} />))
                }
            </div>
            <FileViewer key={"fileViewer"} />
        </div>
    )
}