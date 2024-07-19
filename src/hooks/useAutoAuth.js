import { useEffect } from "react";
import { login } from "../utils/socket/pseudoFetch/login";
import StorageInfo from "../utils/storage";
import useSocket from "./useSocket";



// export default function useAutoAuth() {
//     const { socket } = useSocket();
//     useEffect(()=> {
//         if(socket.connected === false) return;
//         const credentials = StorageInfo.getCredentials();
//         console.log(credentials);
//         if(credentials != undefined) {
//             login(credentials);
//         };
//     }, [socket.connected]);
// }