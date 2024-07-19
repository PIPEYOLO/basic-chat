import { useDispatch, useSelector } from "react-redux"
import FileRepresentation from "./FileRepresentation";
import { selectFilesOrdered } from "../../store/slices/files";
import { IoIosAlert } from "react-icons/io";
import { useEffect } from "react";


const currentFiles = [];
export default function FileViewer() {

    const dispatch = useDispatch();
    const files = useSelector(selectFilesOrdered);
    const filesState = useSelector(state => state.files); // possible error
    console.warn("filesState", filesState);

    if(files.length === 0) return <></>

    return (
        <div className="absolute bottom-0 left-0 max-h-[95%] md:max-h-[90%] lg:max-h-[80%] flex flex-col justify-end">
            <div key={"filesContainer"} className={"h-fit w-full max-h-[90%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 overflow-x-hidden scrollbar-1 animate-slideIn " + (filesState.error ? "bg-red-400" : "")}>
                {
                    files.map(file => <FileRepresentation {...file} />)
                }
            </div>
            {
                filesState.error ? 
                <div key={"error"} className="h-fit w-full flex items-center gap-3 bg-red-500">
                    <div className="h-8 aspect-square">
                        <IoIosAlert className="h-full w-full" fill="#fff" />
                    </div>
                    <p className="h-fit">
                        { filesState.error.message }
                    </p>
                </div>
                : ""
            }
        </div>

    )
}