import useJoinRoom from "../hooks/components/useJoinRoom";
import VideoBackground from "../components/other/VideoBackground";
import DefaultInput from "../components/Inputs/DefaultInput";
import DefaultButton from "../components/Buttons/DefaultButton";
import CopyButton from "../components/Buttons/CopyButton";

export default function JoinRoom(){
    const { 
        room, 
        user, 
        userNameInput_onChange, 
        roomInput_onChange, 
        joinRoomButton_onClick,
    } = useJoinRoom();

    return (
        <main className="h-screen w-screen flex flex-col flex-wrap justify-center content-center relative">
            <VideoBackground />
            <div className="w-[600px] flex-none flex flex-col content-center gap-4 z-1 p-5 border rounded-lg bg-white backdrop-opacity-75">
                <h1 className="">
                    Join a Room
                </h1>

                <DefaultInput placeholder={"write a user name or join as a random one"} name="joinAs" value={user} onChange={userNameInput_onChange} />

                <DefaultInput placeholder={"write a room name or join a random one"} name="room" value={room} onChange={roomInput_onChange} 
                    extraElement={
                        <>
                            <div className="h-full aspect-square">
                                <CopyButton toCopy={room} />
                            </div>
                        </>

                    }
                />
                
                <div className="flex justify-center gap-5 my-4">
                    <div className="flex-none">
                        <DefaultButton className=" text-white px-3 py-2 text-lg bg-gradient-1" onClick={joinRoomButton_onClick}>Join Room</DefaultButton>
                    </div>

                </div>
            </div>

        </main>
    )
}