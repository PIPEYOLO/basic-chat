import { useCallback, useMemo } from "react";
import DefaultButton from "../Buttons/DefaultButton";
import useSocket from "../../hooks/useSocket";
import { RxExit } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import CopyButton from "../Buttons/CopyButton";
import { getRoomLink } from "../../utils/url/roomLink";
import { unsetRoomDataInStorage } from "../../utils/socket/localStorage";
import { leaveRoom } from "../../store/slices/room";

const { SOCKETIO_EVENT_ROOM_LEAVE } = env_;
export default function ChatNav() {

    const dispatch = useDispatch();
    const { room, joinState } = useSelector(state => state.room);
    
    const roomNameRepresentation = useMemo(()=> {
        if(room == null) return "";
        const slice = room.slice(0, 20);
        if(slice.length < room.length) {
            return slice + "..."
        }
        else return room;
    }, [room]);

    const leaveRoomButton_onClick = useCallback((ev) => {
        unsetRoomDataInStorage();
        dispatch(
            leaveRoom()
        );
    }, []);



    return (
        <nav className="relative w-full p-3 flex content-center bg-red shadow-lg">
            <DefaultButton className=" h-10 aspect-square shadow-sm" onClick={leaveRoomButton_onClick}>
                <RxExit className="w-full h-full" style={{ rotate: "y 180deg"}} fill="#f00" color="#f00"/>
            </DefaultButton>

            <div>
                <h4 className="mx-3">
                    <span className=" underline mr-2">Room:</span> 
                    {roomNameRepresentation}
                    </h4>
            </div>


            <div className="h-full aspect-square mx-auto mr-0">
                <CopyButton className="p-2" toCopy={getRoomLink(room)} />
            </div>
        </nav>
    )
}
