import { Link } from "react-router-dom";
import DefaultButton from "../components/Buttons/DefaultButton";
import VideoBackground from "../components/other/VideoBackground";
import { FaGithub, FaSquareInstagram } from "react-icons/fa6";

const { PROJECT_NAME, WEB_ROUTE_JOIN_ROOM, CREATOR_INSTAGRAM, CREATOR_GITHUB } = env_;
export default function Home() {
    return(
        <main className="relative h-full w-full">
            <VideoBackground />

            <div className="h-full w-full absolute flex flex-col items-center justify-evenly z-10">
                <div className="w-full sm:w-fit max-w-[600px] flex flex-col gap-5 sm:rounded-3xl shadow-xl p-2 md:p-10 items-center bg-white">
                    <h1 className="rounded-xl mb-6 text-7xl text-white bg-gradient-2">{ PROJECT_NAME }</h1>

                    <p className="">
                    Our platform enables fully anonymous ephemeral communication through temporary messages, photos, and videos. Users connect securely without personal identifiers or user accounts, ensuring privacy and simplicity. Join us to explore anonymous communication in a safe and unrestricted environment.
                    </p>
                    
                    <Link className="p-3 shadow-lg rounded-lg text-white hover:outline-2 outline-blue-600 hover:scale-110 transition duration-300 bg-gradient-1" to={WEB_ROUTE_JOIN_ROOM}>
                        Join a room now!
                    </Link>
                </div>

                <footer className="w-full flex items-end justify-center p-5 bg-gradient-2">

                    <div className="h-8 flex justify-center gap-4 md:gap-5 lg:gap-10">
                        <a target="_blank" href={CREATOR_INSTAGRAM} className="h-full aspect-square cursor-pointer active:scale-105">
                            <FaSquareInstagram className="h-full w-full" />
                        </a>

                        <a target="_blank" href={CREATOR_GITHUB} className="h-full aspect-square cursor-pointer active:scale-105">
                            <FaGithub className="h-full w-full" />
                        </a>

                    </div>
                </footer>
            </div>

        </main>
    )
}