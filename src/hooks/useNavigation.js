import { useCallback } from "react";
import { useNavigate } from "react-router-dom";


const { WEB_ROUTE_LOGIN, WEB_ROUTE_JOIN_ROOM, WEB_ROUTE_ROOM } = env_
export default function useNavigation() {
    const navigate = useNavigate();

    const goToLogin = useCallback(()=> {
        navigate(WEB_ROUTE_LOGIN);
    }, []);

    const goToJoinRoom = useCallback(() => {
        navigate(WEB_ROUTE_JOIN_ROOM);
    }, []);

    const gotToRoom = useCallback((roomId)=> {
        if(typeof roomId !== "string") throw new Error(`roomId must be a string`);
        navigate(`${WEB_ROUTE_ROOM}`);
    }, []);


    return { goToLogin, goToJoinRoom, gotToRoom};
}