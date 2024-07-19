import { useEffect, useState } from "react";;
import { useDispatch, useSelector } from "react-redux";
import useNavigation from "../useNavigation";
import { getRoomDataFromStorage, setRoomDataInStorage, unsetRoomDataInStorage } from "../../utils/socket/localStorage";
import { joinRoom } from "../../store/slices/room";

export default function useRoom() {

    const dispatch = useDispatch();
    const { goToJoinRoom } = useNavigation();
    const roomState = useSelector(state => state.room);
    
    const [rejoinTrialState, setRejoinTrialState] = useState("notRejoined");
    useEffect(() => { // automatic rejoin and unjoin management and redirection to join-room
        if(roomState.joinState === "unjoined") {
            if(rejoinTrialState === "failedToRejoin") {
                goToJoinRoom();
                unsetRoomDataInStorage();
                return;
            }
            const roomDataInStorage = getRoomDataFromStorage();
            if(roomDataInStorage == null) {
                goToJoinRoom();
            }
            else {
                dispatch(
                    joinRoom(roomDataInStorage)
                );
                setRejoinTrialState("rejoining");
            }
        }
        else if(roomState.joinState === "joined") {
            if(rejoinTrialState === "rejoining") {
                setRejoinTrialState("rejoined");
            };
            const roomDataInStorage = getRoomDataFromStorage();
            if(roomDataInStorage == null) {
                setRoomDataInStorage(roomState.user);
            };
        }
    }, [roomState.joinState]);

    

    useEffect(()=> {
        if(env_.NODE_ENV === "development") {
            console.warn(`roomState`, roomState);
        };
    });


}