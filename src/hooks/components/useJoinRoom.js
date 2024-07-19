import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useNavigation from "../useNavigation";
import useSocket from "../useSocket";
import { joinRoom as joinRoomAction } from "../../store/slices/room";


export default function useJoinRoom() {
    const { socket } = useSocket();
    const dispatch = useDispatch();

    const { joinState, error: joinError} = useSelector(state => state.room);

    const { gotToRoom } = useNavigation();
    const [room, setRoom] = useState("");
    const [userName, setUserName] = useState("");



    useEffect(()=> { // redirects to room page when user joins room rsuccesfuly
        if(joinState === "joined") {
            gotToRoom(room);
        };
    }, [joinState]);

    const userNameInput_onChange = useCallback((ev) => {
        setUserName(ev.target.value);
    }, [])

    const roomInput_onChange = useCallback((ev) => {
        setRoom(ev.target.value);
    }, [])

    const joinRoomButton_onClick = useCallback((ev) => {
        console.log(userName);
        let room_ = room.length == 0 ? "room_" + randomName() : room;
        let userName_ = userName.length == 0 ? "userName_" + randomName() : userName;
        joinRoom({room: room_, name: userName_});
    }, [room, userName]);

    const randomName = useCallback(()=> {
        return crypto.randomUUID();
    }, []);


    const joinRoom = useCallback(({room, name})=> {
        dispatch(
            joinRoomAction({room, name})
        );
    }, []);



    return { 
        socket,
        room,
        // randomRoomNameButton_onClick,
        userNameInput_onChange,
        roomInput_onChange,
        // createRoomButton_onClick,
        joinRoomButton_onClick
    };
}