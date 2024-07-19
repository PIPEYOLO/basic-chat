import { useCallback, useRef } from "react"

import { GoPaperclip } from "react-icons/go";
import DefaultButton from "../Buttons/DefaultButton";

export default function FilePickmentSet({onChange}) {

    const inputRef = useRef();
    const fileButton_onClick = useCallback((ev) => {
        inputRef.current.click();
    }, [inputRef.current]);

    return (
        <>
            <input className="hidden" ref={inputRef} type="file" accept=".jpeg, .jpg, .png, .mp4" multiple onChange={onChange}/>
            <DefaultButton className="h-full aspect-square bg-gradient-1" onClcik>
                <GoPaperclip fill="#fff" className="h-full w-full" onClick={fileButton_onClick} />
            </DefaultButton>
        </>

    )
}