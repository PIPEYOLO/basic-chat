import { useRef } from "react";



export default function VideoBackground({blockerOpacity=50, height=640, width=640}) {

    const opacity = blockerOpacity < 1 ? blockerOpacity : blockerOpacity/100;

    const videoNumber = Math.floor(Math.random() * 3) + 1;
    const src = `/public/videos/theme_video_${videoNumber}.mp4`;
    
    const videoRef = useRef(
        <video width={width} height={height} src={src} autoPlay loop className={"h-full w-full object-cover " + (env_.NODE_ENV === "development" ? "hidden" : "")} />
    );


    return (
        <div className="h-full w-full absolute">
            <div className="h-full w-full absolute bg-black" style={{
                opacity: opacity 
            }}></div>
            {videoRef.current}
        </div>
    )
}