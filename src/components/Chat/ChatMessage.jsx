import { memo, useMemo } from "react"
import LoadingSpinner from "../other/LoadingSpinner";
import { IoMdAlert } from "react-icons/io";
import { getRandomColor } from "../../utils/color/random";
import Tooltip from "../other/Tooltip";
import { getBlobURLFromDataAndType } from "../../utils/url/media";


const ChatMessage = memo(
    function ({ id, localId, date, user, contents, shipState, error}) {
        
        const isOwnMessage = shipState != undefined;
        // A este elemento agregarle un tooltip de error (2 arvhicos adelante elemewithhover), luego prosseguir con el tema de envar archivos
        // Message user: 
        const messageUserRepresentation = useMemo(()=> {
            if(isOwnMessage) return ""; // is our message so do not show the message´s name
            const userName = user.name;
            const sliced = userName.slice(0, 10);
            let nameRepToUse = sliced.length !== userName.length ? sliced + "." : userName;

            return `${nameRepToUse}-${user.id.slice(0, 5)}`; // we combine with the id to differenciate the different users that have the same name
        }, [])
        
        // Message contents: 
        const separatedContents = useMemo(()=> {
            let textContent, notTextContents = [];
            contents.forEach(content => {
                if(content.type === "text/plain") textContent = content;
                else {
                    notTextContents.push(content);
                }
            })  
            return {
                textContent, notTextContents
            };

        }, []);

        const rendered_notTextContents = useMemo(()=> {
            console.log(`rendered`, separatedContents.notTextContents);
            return separatedContents.notTextContents.map(content => {
                const srcUrl = getBlobURLFromDataAndType({ data: content.content, type: content.type});

                if(/^video/.test(content.type)) {
                    return (
                        <video 
                            className="h-full w-full object-contain"
                            src= {srcUrl} 
                            controls 
                        />
                    )
                }
                else {
                    return (
                        <img 
                            className="h-full w-full object-cover"
                            src={srcUrl}
                        />
                    )
                }
            });

        }, []);

        const renderedShipstateRepresentation = useMemo(()=> {
            if(shipState === "shipping") {
                return (
                    <div className="h-6 aspect-square my-auto">
                        <LoadingSpinner  />
                    </div>
                )
            }
            else if(shipState === "notShipped") {
                return (
                    <div className="h-10 aspect-square">
                        <IoMdAlert fill="#f00" />
                    </div>
                )
            }
            else {
                return "";
            }

        }, [shipState]);


        return (
            <div key={localId} className={"flex content-center"}>

                <div className={" p-2 px-3 rounded-lg " + (isOwnMessage ? "m-0 ml-auto bg-black text-white" : " m-0 mr-auto shadow-lg bg-white text-black") } >
                    {
                        isOwnMessage === false ? 
                        <p key={"emitter"} className="text-dark font-semibold start" style={{ color: getRandomColor()}}>
                            {messageUserRepresentation}
                        </p>
                        : ""
                    }

                    <div key={"notTextContents"} className="flex flex-col gap-2">
                        {
                            rendered_notTextContents.map((renderization, i) => (
                                <div key={`content_${i}`} className="h-64 aspect-square">
                                    {renderization}
                                </div>
                            ))
                        }
                    </div>
                    <p key={"textContent"}>
                        {separatedContents.textContent?.content ?? ""}
                    </p>
                </div>
                {
                    error ? <Tooltip 
                        reference={renderedShipstateRepresentation}
                        toolTipContent={(
                            <div className="font-semibold max-w-24 p-3 text-sm text-black bg-white">
                                {error.message}
                            </div>
                        )}
                    />
                    : ""
                }
            </div>
        )
    }, 
    (prev, next) => { // if it is the same mesage
        return prev.localId == next.localId && prev.shipState === next.shipState;
    }
);

export default ChatMessage;