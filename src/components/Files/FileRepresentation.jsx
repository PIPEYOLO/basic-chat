import { useCallback, useEffect, useMemo, useRef } from "react";
import { removeFiles } from "../../store/slices/files";
import { useDispatch } from "react-redux";
import DefaultButton from "../Buttons/DefaultButton";
import { RxCross2 } from "react-icons/rx";
import { IoIosAlert } from "react-icons/io";
import LoadingSpinner from "../other/LoadingSpinner";
import { getBlobURLFromDataAndType } from "../../utils/url/media";

export default function FileRepresentation({id, name, data, type, error}) {
    
    const dispatch = useDispatch();

    const contentRendered = useMemo(()=> {
        if(data == null && error == null) {
            return (
                <div className="h-full w-full relative">
                    <div className="h-10 aspect-square absolute top-50 left-50 -translate-x-1/2">
                        <LoadingSpinner />
                    </div>
                </div>
            )
        };
        if(error) {
            return (
                <div className="object-contain">
                    <div className="h-16 aspect-square bg-red backdrop:opacity-30">
                        <IoIosAlert />
                    </div>
                    <p className="font-semibold text-red-400">{error.message}</p>
                </div>

            )
        };

        const srcUrl = getBlobURLFromDataAndType({ data, type});

        if(type.startsWith("video/")) {
            return <video className="h-full w-full object-cover" src={srcUrl} controls/>
        }
        else if(type.startsWith("image/")){
            return <img className="h-full w-full object-cover" src={srcUrl} />
        }

    }, [id, data, error]);

    const removeFileButton_onClick = useCallback((ev)=> {
        ev.stopPropagation();
        dispatch(
            removeFiles([id])
        )
    }, [id]);

    return (
        <div key={id} className="relative h-full aspect-video rounded-lg shadow-lg border border-black animate-appear">
            <DefaultButton className="absolute right-5 top-5 h-10 aspect-square shadow-0 rounded-full border-2 z-10 border-red-600 bg-red-500 backdrop:opacity-45" onClick={removeFileButton_onClick}>
                <RxCross2 className="h-full w-full" fill="#f00"/>
            </DefaultButton>
            {
                contentRendered
            }
        </div>
    )
}