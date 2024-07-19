import { useMemo } from "react";


export default function ConnectionStateTitle({state}) {
    
    const renderedConnectionClasses = useMemo(()=> {
        if(state === "connected") return "bg-green-500";
        if(state === "disconnected") return "bg-red-500";
        if(state === "connecting") return "bg-yellow-500";
        return "disconnected";
    }, [state]);

    return (
        <h1>
            Currently
            <span className={"m-2 " + renderedConnectionClasses}>
                {state}
            </span>
        </h1>
    )
}