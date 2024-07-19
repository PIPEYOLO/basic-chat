import { useSelector } from "react-redux"
import useRoom from "../hooks/components/useRoom";
import EmojiPickmentSet from "../components/Sets/EmojiPickmentSet";
import DefaultInput from "../components/Inputs/DefaultInput";
import MessageCreationSet from "../components/Sets/MessageCreationSet";
import ChatSection from "../components/Chat/ChatSection";
import ChatNav from "../components/Chat/ChatNav";

export default function Room() {

    useRoom();
    const { joinState } = useSelector(state => state.room);
    // const { joinState, user, memebers, error, messages } = useSelector(state => state.room);


    // proseguir con el dieseñño
    return (
        <main className="h-screen w-screen flex justify-center content-center">
            
            <div className="h-full w-full p-8  shadow-2xl">
                <div className="h-full w-full relative flex flex-col rounded-lg bg-slate-50 backdrop:opacity-70">
                    
                    <ChatNav />
                    <ChatSection />
                    <MessageCreationSet/>


                    {
                        joinState === "leaving" ? 
                        <h3 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 text-white rounded-lg bg-black">
                            {joinState}
                        </h3>
                        : ""
                    }

                </div>
            </div>


        </main>
    )
}